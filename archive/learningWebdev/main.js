this.onload = () => init();

function init() {
	
}


const SetCssVariable	= (name,value)	=> document.documentElement.style.setProperty('--'+ String(name), String(value))
const GetUrlParm 		= (x) 			=> new URLSearchParams(document.location.search.substring(1)).get(x)
const GetUrlParmAll		= ()			=> {
	let params = []
	document.location.search.split("&").forEach(x => {
		x = x.replace("?","")
		 params.push({name:x.split("=")[0],value:x.split("=")[1]});
	});
	return params 
}
const SetUrlParm = (name,value) => history.replaceState({}, '', document.location.pathname + "?" + String(name) + "=" + value)

window.location.search.split("&").forEach(element => {
	element.split("=")
});



if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    SetCssVariable("clr-back", "white")
}



let burger = document.getElementById("siteleft")
var burgertoggle = document.getElementsByClassName("burgertoggle");
var i;
for (i = 0; i < burgertoggle.length; i++) {
	burgertoggle[i].addEventListener("click", () => 
	{
		burger.classList.toggle("active")
		x = event.target
		if (burger.classList.contains("active")) {
			x.innerHTML = 'menu_open'
			document.body.classList.add("active")
		} else {
			x.innerHTML = 'menu'
			document.body.classList.remove("active")
		}
	})
	
}