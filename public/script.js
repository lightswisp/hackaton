particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log('callback - particles.js config loaded');
  });

document.querySelector(".encrypt-submit").onclick = async (e) =>{
  e.preventDefault()
  try{
    let text = btoa(document.querySelector("#phrase-encrypt").value)
    let pass = document.querySelector("#pass-encrypt").value
    let origin = window.location.origin
    let response = await fetch(origin + `/encrypt?text=${text}&pass=${pass}`)
    let json = await response.json()
    Swal.fire({
      text:`Your encrypted message:\n
      ${json["encrypted"]}`,
      confirmButtonColor: '#01c38d',
      })
  }catch{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      confirmButtonColor: '#01c38d',
    })
  }
  
}
document.querySelector(".decrypt-submit").onclick = async (e) =>{
  e.preventDefault()
  try{
    let text = document.querySelector("#phrase-decrypt").value
    let pass = document.querySelector("#pass-decrypt").value
    let origin = window.location.origin
    let response = await fetch(origin + `/decrypt?text=${text}&pass=${pass}`)
    let json = await response.json()
    Swal.fire({
      text:`Your decrypted message:\n${json["decrypted"]}`,
      confirmButtonColor: '#01c38d',
    })
  }catch{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      confirmButtonColor: '#01c38d',
    })
  }
}