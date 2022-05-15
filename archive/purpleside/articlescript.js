document.querySelectorAll(".copy").forEach(button => button.addEventListener("click", e => {
    document.querySelectorAll(".alert").forEach(e => e.remove())
    console.log(e.currentTarget)
    var range = document.createRange(), selection = window.getSelection(); 
    selection.removeAllRanges(); 
    range.selectNodeContents(e.currentTarget); 
    selection.addRange(range); 
    document.execCommand('copy'); 
    selection.removeRange(range);


    const alert = document.createElement('div');
    const text = document.createElement('span');
    alert.className = "alert"
    text.innerText = "Copier : "
    alert.innerText = e.currentTarget.innerText
    document.body.appendChild(alert)
    alert.prepend(text)
    window.requestAnimationFrame(()=>alert.classList.add("visible"))
    setTimeout(()=>alert.classList.remove("visible"), 2700)
    setTimeout(()=>document.body.removeChild(alert), 3000);
}))


const openTab = (tabButton, tab, tabgroup) => {
    const parrent = document.getElementById(tabgroup);
    parrent.querySelectorAll(".tablinks").forEach(e => e.classList.remove("active"))
    parrent.querySelectorAll(".tab").forEach(e => e.classList.remove("active"))
    parrent.querySelectorAll(tab).forEach(e => e.classList.add("active"))
    tabButton.classList.add("active")
}