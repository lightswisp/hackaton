const hidden_flyIn = document.querySelectorAll(".hidden-fly");

const fly_options = {
	threshold: 0.3,
	rootMargin: "0px",
}

const observer_fly = new IntersectionObserver (function(entries, observer_fly){
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.toggle("in");
		}
		else{
			entry.target.classList.remove("in");
		}
	});
}, fly_options);

hidden_flyIn.forEach(hidden_flyIn => {
	observer_fly.observe(hidden_flyIn);
});