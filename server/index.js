/*
    Author: https://github.com/lightswisp/
    Discord: ya_v_inkognito#2752
*/

const express = require("express")
const encryption = require("./encryption")
const app = express()
const multer = require('multer')
const path = require("path")
const fs = require('fs');
const upload = multer({ storage: multer.memoryStorage() })
const PORT = 3000

app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
})

app.get("/encrypt", (req, res)=>{
    const text = req.query.text
    const pass = req.query.pass
    if(!text || !pass){
        res.sendStatus(400)
    }
    const encoded = Buffer.from(encryption.encrypt(text, pass), 'utf8').toString('base64')  
    let json = {
        "status": "success",
        "original": text,
        "encrypted": encoded
    }
    res.send(JSON.stringify(json))
})

app.get("/decrypt", (req,res) =>{
    const text = req.query.text
    const pass = req.query.pass
    const decoded = Buffer.from(text, 'base64').toString('utf8') 
    const decrypted = Buffer.from(encryption.decrypt(decoded, pass), 'base64').toString('utf-8') 

    if(!text || !pass || !decrypted){
        res.sendStatus(400)
    }

    let json = {
        "status": "success",
        "decrypted": decrypted
    }
    res.send(JSON.stringify(json))
})

app.post('/upload', upload.single('file'), (req, res) => {
    const pass = req.body.pass
    const fileBuffer = req.file.buffer.toString()
    console.log(fileBuffer)
    const filename = req.file.originalname
    const encodedBuffer = Buffer.from(encryption.encrypt(fileBuffer, pass), 'utf8').toString('base64') 
    fs.writeFileSync(filename, encodedBuffer); //saving the buffer to the temp file
    res.download(filename, filename, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        fs.unlinkSync(filename);
        console.log("[encrypted] File sent and deleted successfully!");
      })
})

app.post('/download', upload.single('file'), (req, res) => {
    const pass = req.body.pass
    const fileBuffer = req.file.buffer.toString()
    const filename = req.file.originalname
    const decodedBuffer = Buffer.from(fileBuffer, 'base64').toString('utf8')
    const decryptedBuffer = encryption.decrypt(decodedBuffer, pass)
    fs.writeFileSync(filename, decryptedBuffer);
    res.download(filename, filename, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        fs.unlinkSync(filename);
        console.log("[decrypted] File sent and deleted successfully!");
      })
})

app.listen(PORT, () =>{
    console.log(`Server is listening on: http://localhost:${PORT}`)
})





