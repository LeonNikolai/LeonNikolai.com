window.onload = () => initState();
const rd           = max => Math.random()*max>>0
const rd_accurate  = max => Math.floor(Math.random()*max)
const rd_arr       = arr => arr[Math.random() * arr.length>>0]
const rd_MM        = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);
const canvas = document.getElementById('view');
const ctx = canvas.getContext('2d', {lowLatency: true,desynchronized: true, alpha: false});
let w = ctx.canvas.width  = document.documentElement.clientWidth;
let h = ctx.canvas.height = document.documentElement.clientHeight;
let inX,inY,oldX,oldY,linearray=[],mouse=[],color
window.addEventListener("resize", () => {w = ctx.canvas.width  = document.documentElement.clientWidth; h = ctx.canvas.height = document.documentElement.clientHeight; requestAnimationFrame(drawBackground);})
    
function drawBackground() {
    ctx.beginPath(); 
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, h);
    ctx.moveTo(inX,inY);
    for(i = 0; i < linearray.length; i++) {
        ctx.quadraticCurveTo(
            linearray[i][0]*w>>0,
            linearray[i][1]*h>>0,
            linearray[i][2]*w>>0,
            linearray[i][3]*h>>0
        );
    }
    ctx.quadraticCurveTo(mouse[0]*h>>0,mouse[1]*w>>0,inX,inY);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
    for(i = 0; i < star.length; i++) {
            ctx.fillStyle = `rgb( ${star[i][2]} , ${star[i][3]} , ${star[i][4]} )`;
            ctx.fillRect(star[i][0]*w>>0, star[i][1]*h>>0, 2, 2);
    }
    for(i = 0; i < linearray.length; i++) {
        ctx.beginPath(); 
        ctx.fillStyle = `rgb( ${star[i][2]} , ${star[i][3]} , ${star[i][4]} )`;
        ctx.arc(linearray[i][2]*w>>0, linearray[i][3]*h>>0, 2, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
    }
    ctx.beginPath(); 
    ctx.fillStyle = `rgb(255,255,255 )`;
    ctx.fillRect(inX-1,inY-1, 2, 2);
    ctx.closePath();
};
const newBackground = () => {
	linearray = []
	star = []
	for(i = 0; i < rd_MM(2,14); i++) {
		linearray.push ([
			Math.random(),
			Math.random(),
			Math.random(),
			Math.random()
		])
	}
	for(i = 0; i < 50; i++) {
		star.push ([
			Math.random(),
			Math.random(),
			rd_MM(0,256),
			rd_MM(0,256),
			rd_MM(0,256)
		])
	}
	mouse = [Math.random(), Math.random()]
	color = "#" + Math.floor(2+Math.random()*3).toString(16)+Math.floor(3+Math.random()*3).toString(16)+ Math.floor(3+Math.random()*3).toString(16)
}

function initState() {
    changeTittle();
    window.addEventListener('mousemove',  (e)=> {
        inX = Math.floor(e.x)
        inY = Math.floor(e.y)
            requestAnimationFrame(drawBackground);
    });
    window.addEventListener('touchmove', (e) => {
        inX = e.touches[0].clientX;
        inY = e.touches[0].clientY;
        requestAnimationFrame(drawBackground);
    });
    window.addEventListener('touchstart', (e) => {
        inX = e.touches[0].clientX;
        inY = e.touches[0].clientY;
        requestAnimationFrame(drawBackground);
    });
}

setInterval(changeTittle, rd_MM(2500, 3500));
function changeTittle() {
    newBackground();
    requestAnimationFrame(drawBackground);
    document.getElementById("greeting").innerHTML = generate();
}


// random text ->


const characterRepeat = (character,times) => {
    let x = character;
    for ( var i = 0; i < times; i++ ) {
        x += character
    }
    return times > 0 ? x : '';
}

const generate = x => {
	const getTime = (h,m) => {
		const d = new Date();
		h = h ||d.getHours();
		m = m ||d.getMinutes();
	
		const formatedTime = String(h).padStart(2, '0') + ":" + String(m).padStart(2, '0');
	
		const night = [
			`${rd_arr(["Until tomorrow","Night Night", "good night","G'night"])}${rd_arr([", " + rd_arr(friend), ""]) + rd_arr(end)}`,
			`${formatedTime}, upp late today?`,
			`Go to sleep, the time is ${formatedTime}`,
			"Go to bed, you sleepy head!",
			"Go the fuck to sleep!",
			"See ya’ in the mornin'!",
		];
		const morning = [
			`good morning${[", " + friend[rd(friend.length)], ""][rd(2)] + end[rd(end.length)]}`,
			`${["good","a fantastic",""][rd(2)]} morning`,
			"Bad morning, it is not!",
			"I see you survived the night",
			"good morning, can you hear the birds tweeting?",
			`${h}:${String(m).padStart(2, '0')}, early today?`,
			"best morning for you",
			"Good morning, i'm not awake.",
			"Top o' the mornin’!"
		];
		const day = [
			`good day${[", " + friend[rd(friend.length)], ""][rd(2)] + end[rd(end.length)]}`,
			"having a good day?",
		];
		const afternoon = [
			`good afternoon${[", " + friend[rd(friend.length)], ""][rd(2)] + end[rd(end.length)]}`,
		];
		const evening = [
			`good evening${[", " + friend[rd(friend.length)], ""][rd(2)] + end[rd(end.length)]}`,
			`I see you survived the day, what about the night?`,
		];
	
		return h < 5  ? rd_arr(night)    
			 : h < 10 ? rd_arr(morning)  
			 : h < 13 ? rd_arr(day)      
			 : h < 18 ? rd_arr(afternoon)
			 : h < 21 ? rd_arr(evening)  
			 : h < 24 ? rd_arr(night)    
			 : rd_arr(day)
			 ;
	}
	
	let hi = [
		"hi",
		`hey${characterRepeat('y',rd_MM(0,5))}`,
		["hiya", "hiyah"][rd(2)],
		"hello",
		"hail",
		"ahoy",
		"greetings",
		"howdy",
		"welcome",
		["sup", "zup"][rd(2)],
		"wassup",
	]
	let statement = [
		"i greet you,",
		"i welcome you,",
		"nice to meet you,",
		"glad to see you,",
		"Good to see you,",
		"pleasure to meet you,",
		"blessings to you,",
		"My greetings,",
		"I say hi,",
		"walk beside me,"
	]
	let friend = [
		"friend",
		"visitor",
		"stranger",
		"traveler",
		"adventurer",
		"explorer",
		"wanderer",
		"comrade",
		"human",
		"mate",
		"dude",
		"again"
	]
	let end = [
		"",
		"!",
		".",
		".",
	]
	const trollurl = () => `<a href="https://${
		rd_arr([
		"youtu.be/dQw4w9WgXcQ",
		"youtu.be/Ct6BUPvE2sM",
		"youtu.be/cvh0nX08nRw",
		"youtu.be/woe2tvl2caw",
		"youtu.be/g_KYQltEAuc",
		])
	}">click for video</a>`;
	let meme = [
		"Hello, World!",
		"Salutations",
		hi[rd(hi.length)] + [ " " + friend[rd(friend.length)], ""][rd(2)] + end[rd(end.length)],
		statement[rd(statement.length)] + " " + friend[rd(friend.length)] + end[rd(end.length)],
		rd_arr(["yello", "hola", "hei", "hallo","hej", "god dag","guten tagen", "goedendag", "privet", "zdravstvuyte", "chào", "Salve", "shalom", "holla","bonjour","salut", "aloha", "konnichiwa"]),
		getTime(),
		`what's ${rd_arr(["cooking","crack-a-lackin'","poppin'","crackin'","the craic","the rumpus","the bag","the haps","new","up"])} ?`,
		`Insert picture of ${rd_arr(["me","baked beans","eggs","designs","impressive stuff","shoes","the skyline","a cat","earth","a black hole"])}`,
		trollurl(),
		"*WAVES*",
		"[insert image here]",
		"Oh? You're approaching me?",
		"Peek-a-boo!",
		"Hey' You're finally awake",
		"Why hello there",
		"Greetings. I trust you will not waste my time.",
		"I see you",
		"How may I be of service?",
		"Need assistance?",
		"what are you doing here?",
		"what do you require?",
		"what brings you here?",
		"what do you seek?",
		"what is it you want?",
		"what is this regarding?",
		"how's it hanging?",
		"Tell me of your travels.",
		"There you are.",
		"Ahh, look who it is",
		"A warm welcome",
		"Oh, hello. You again.",
		"You are most welcome",
		"welcome to my domain.",
		"welcome to the big show",
		"Have we met?",
		"Do i know you?",
		"yes, what can i do for you?",
		"I've been waiting for you,",
		"Oi m8",
		"well met!",
		"i tip my hat to you!",
		"we meet at last.",
		"You look familiar",
		"State your business",
		"i've been expecting you",
		"|-|3110",
		"62617a696e6761",
		"01101000 01101001",
		"Bow ties are cool.",
		'"Abstract line art"',
		"Hello again, dumbbell!",
		"You face Jaraxxus, Eredar Lord of the Burning Legion!",
		"i used to be an adventurer like you",
		"Hey, hey...! Wanna buy a funnel cake?",
		"ice to meet you",
		"Let me guess. Someone stole your sweetroll!",
		"Welcome to the Aperture Science computer-aided enrichment center.",
		"Time.",
		"greets",
		"Undefined Person",
		"The way to get started is to quit talking and begin doing",
		"howzit?",
		"thats so random.",
		"Lovely to meet you",
		"Long-time no see",
		"Speak quickly",
		"WELL, LOOK AT YOU!",
		"Please, have a look around",
		"Approach and be recognized",
		"Quickly! Before I get bored",
		"You look like a bright one.",
		"One hand washes the other",
		"I am honored by your presence.",
		"You flatter me with your attention",
		"You like to stand close to the fire, don't you",
		"Long time no see",
		"business as usual",
		"This weather is odd.",
		"Nice weather today",
		"Keep scrolling.",
		"300+ unique random greetings",
		"today, we will emerge victorious!",
		"Not all people who wander are lost.",
		'<img src="./bean.jpg"></img>',
	]
	x_ = x || rd(meme.length);
    let sentence = [
        meme[x_],
        meme[x_],
        meme[x_],
        meme[x_],
		hi[rd(hi.length)] + [ " " + friend[rd(friend.length)], ""][rd(2)] + end[rd(end.length)],
		statement[rd(statement.length)] + " " + friend[rd(friend.length)] + end[rd(end.length)]
	]
    out = x == x_ ? meme[x] : sentence[rd(sentence.length)]
    return out.charAt(0).toUpperCase() + out.substring(1)
}
