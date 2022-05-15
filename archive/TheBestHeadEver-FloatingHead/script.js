const headPos = document.getElementById("head-pos")
const head = document.getElementById("head")
let timout = false
let mouseX = 0
let mouseY = 0
let repeater
let moving
function drawHead(e) {
    const bounding = head.getBoundingClientRect();
    const headX = bounding.x;
    const headY = bounding.y;
    const width = bounding.width;
    const height = bounding.height;
    const posX = mouseX-width/2
    const posY = mouseY-height/1.6
    headPos.style = `
    --x:${posX}px;
    --y:${posY}px;
    --rotate: 0deg;
    `
    head.style = ''
    const distance = Math.sqrt(Math.pow(posX-headX, 2) + Math.pow(posY-headY,2)) >> 0; 
    if(distance > 150) {
        let angle = Math.atan2(posY - headY, posX - headX) * 180 / Math.PI
        switch(angle/18 >>0){
            default:      head.className  = 'front'; break;
            case -6      : 
            case -5      : 
            case -4      : 
            case -3      : 
            head.style = `--rotate:${angle+90}deg;`
            head.className  = 'uppMore'; break;
            case 6      : 
            case 5      : 
            case 4      : 
            case 3      : 
            head.style = `--rotate:${angle-90}deg;`
            head.className  = 'down';
            break;
            case -2      : 
            case -1      : 
            case 0      : 
            case 1      : 
            case 2      : 
            head.style = `--rotate:${angle}deg;`
            head.className  = 'rightMore'; break;
            case -7      : 
            case -8      : 
            case -9      : 
            case -10      : 
            case 9      : 
            case 8      : 
            case 7      : 
            head.style = `--rotate:${angle-180}deg;`
            head.className  = 'leftMore'; break;
            
        }

    } else if(distance > 50) {
        let angle = Math.atan2(posY - headY, posX - headX) * 180 / Math.PI
        switch(angle/18 >>0){
            default:      head.className  = 'front'; break;
            case -6      : 
            case -5      : 
            case -4      : 
            case -3      : 
            head.style = `--rotate:${angle+90}deg;`
            head.className  = 'upp'; break;
            case 6      : 
            case 5      : 
            case 4      : 
            case 3      : 
            head.style = `--rotate:${angle-90}deg;`
            head.className  = 'down';
            break;
            case -2      : 
            case -1      : 
            case 0      : 
            case 1      : 
            case 2      : 
            head.style = `--rotate:${angle}deg;`
            head.className  = 'right'; break;
            case -7      : 
            case -8      : 
            case -9      : 
            case -10      : 
            case 9      : 
            case 8      : 
            case 7      : 
            head.style = `--rotate:${angle-180}deg;`
            head.className = 'left'; break;
            
        }
    } else {head.className  = 'front'}
    window.requestAnimationFrame(drawHead)
}
const uppdateMouse = e => {[mouseX,mouseY] = [e.clientX, e.clientY]}
document.addEventListener('mousemove', uppdateMouse);
window.requestAnimationFrame(drawHead)


