const h1 = document.getElementById("title");
let id = null;
let pos = 0;
clearInterval(id);
id = setInterval(() => {
    h1.textContent = h1.textContent == "ULTRA RAPID FIRE_" ? "ULTRA RAPID FIRE " : "ULTRA RAPID FIRE_";
}, 500);

const btns = document.querySelectorAll("button");
btns.forEach((btn) => {
    if (btn.id !== "start-btn") {
        btn.addEventListener("click", () => {
            btn.classList.add("popup");
            btn.style.transform = `translateY(-30vh)`;
            btn.style.transform += btn.id === "opt-btn" ? `translateX(46vh)` : `translateX(-50vh)`;
            btns.forEach((other) => {
                if (other !== btn) {
                    other.disabled = true;
                    other.classList.add("animate__animated", "animate__fadeOutDown");
                    other.addEventListener("animationend", () => {
                        htpBtn.style.visibility = "hidden";
                    })
                }
            })
        })
    }
})