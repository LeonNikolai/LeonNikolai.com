function expandmenu() {
    var element = document.getElementById("mainnav");
    var bodytag = document.getElementsByTagName("BODY")[0];
    element.classList.toggle("expanded");
    bodytag.classList.toggle("expanded");
  }