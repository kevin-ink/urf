const h1 = document.getElementById("title");
let id = null;
let pos = 0;
clearInterval(id);
id = setInterval(() => {
    h1.textContent = h1.textContent == "ULTRA RAPID FIRE_" ? "ULTRA RAPID FIRE " : "ULTRA RAPID FIRE_";
}, 500);

const opt_popup = document.createElement("div");
opt_popup.setAttribute("id", "options")