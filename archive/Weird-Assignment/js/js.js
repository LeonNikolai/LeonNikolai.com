const cut = document.getElementById("cut")
const mask = document.getElementById("mask")
const mask2 = document.getElementById("mask2")
const mask3 = document.getElementById("mask3")

cut.addEventListener("mousemove", mousemove)

function mousemove(e) {
    const pos = getMousePos(cut, e)
    mask.setAttributeNS(null, "cx", pos.x)
    mask.setAttributeNS(null, "cy", pos.y)
    mask2.setAttributeNS(null, "cx", pos.x)
    mask2.setAttributeNS(null, "cy", pos.y)
    mask3.setAttributeNS(null, "cx", pos.x)
    mask3.setAttributeNS(null, "cy", pos.y)
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: (evt.clientX - rect.left)/rect.width*1920,
      y: (evt.clientY - rect.top)/rect.height*1080
    };
}


