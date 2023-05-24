// ticking "_"
const h1 = document.getElementById("title");
const main = document.getElementById("main");
const canvas = document.getElementById("main-canvas");
const topBar = document.getElementById("top-bar");
topBar.style.display = "none";
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

function expand(id) 
{
    const popup = id === 'opt-btn' ? document.getElementById("opt-popup") : document.getElementById("htp-popup");
    popup.classList.add("popup");
    popup.classList.add("scale-in-ver-top");
    popup.style.display = "block";
}

// rearranges the interface after selecting a button
function rearrange(e) 
{
    const btns = document.querySelectorAll("button");
    btns.forEach((other) => {
        other.disabled = true;
        other.classList.remove("cue");
        if (other === e.target) 
        {
            other.classList.add("move");
            other.style.transform = `translateY(-30vh)`;
            other.style.transform +=
                other.id === "opt-btn" ? `translateX(29vw)` : `translateX(-29vw)`;
        }
        else if (!other.classList.contains("close-btn"))
        {
            other.classList.add("animate__fadeOutDown", "animate__animated");
        }
    });
    expand(e.target.id);
    h1.classList.remove("animated");
    h1.classList.add("animate__fadeOutDown", "animate__animated");
    h1.addEventListener("animationend", () => h1.style.visibility = "hidden");
    main.classList.add("darken");
}

function startGame() 
{
    // TO BE IMPLEMENTED
    main.classList.add("puff-out-center");
    main.addEventListener("animationend", () => {
        main.style.display = "none";
    })
    canvas.style.display = "block";
    canvas.classList.add("puff-in-center");
}

// get all buttons and make them clickable
const btns = document.querySelectorAll("button");
if (btns.length !== 0) {
    btns.forEach((btn) => {
        btn.classList.add("cue");
        if (btn.id !== "start-btn") 
        {
            btn.addEventListener("click", rearrange);
        }
        else
        {
            btn.addEventListener("click", startGame);
        }
    });
}


