// ticking "_"
const h1 = document.getElementById("title");
const main = document.getElementById("main");
main.classList.add("animated");
h1.classList.add("animated");
if (h1) 
{
    const change_ = setInterval(() => {
        h1.textContent =
            h1.textContent == "ULTRA RAPID FIRE_"
            ? "ULTRA RAPID FIRE "
            : "ULTRA RAPID FIRE_";
    }, 500);
}

// expands the interface for the selected button
function expand(e) {
    const btns = document.querySelectorAll("button");
    btns.forEach((other) => {
        other.disabled = true;
        other.classList.remove("cue");
        if (other === e.target) 
        {
            other.classList.add("move");
            other.style.transform = `translateY(-30vh)`;
            other.style.transform +=
                other.id === "opt-btn" ? `translateX(32vw)` : `translateX(-32vw)`;
        }
        else 
        {
            other.classList.add("animate__fadeOutDown", "animate__animated");
        }
    });
    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.classList.add("scale-in-ver-top");
    h1.classList.remove("animated");
    h1.classList.add("animate__fadeOutDown", "animate__animated");
    main.classList.add("darken");
    main.appendChild(popup);
    
}

// get all buttons and make them clickable
const btns = document.querySelectorAll("button");
if (btns.length !== 0) {
    btns.forEach((btn) => {
        btn.classList.add("cue");
        if (btn.id !== "start-btn") {
          btn.addEventListener("click", expand);
        }
    });
}


