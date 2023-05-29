import { Main_Scene, Additional_Scenes, Canvas_Widget } from "../main-scene.js";

//
// FUNCTIONS
//

export function updateBar(points, accuracy)
{
  let div = document.getElementById("points");
  div.innerHTML = `${points}<p>pts</p>`;
  div = document.getElementById("accuracy");  
  div.textContent = accuracy + "%";
}

function changeOpt(e) {
  const opt = e.target.parentNode.parentNode.querySelector("h3").id;
  const p = e.target.parentNode.querySelector("p");
  let it = indexes[opt];
  const arr = options[opt];
  it = e.target.classList.contains("left")
    ? (it - 1 + arr.length) % arr.length
    : (it + 1) % arr.length;
  indexes[opt] = it;
  let newOpt = arr[it];
  config[opt] = newOpt;
  if (typeof newOpt === "string") {
    newOpt = newOpt.toUpperCase();
  } else if (typeof newOpt === "boolean") {
    newOpt = newOpt === false ? "OFF" : "ON";
  }
  p.textContent = newOpt;
  console.log(config);
}

// expands menu for options and how to play
function expand(id) {
  const popup =
    id === "opt-btn"
      ? document.getElementById("opt-popup")
      : document.getElementById("htp-popup");
  popup.classList.add("scale-in-ver-top");
  popup.addEventListener("animationend", () => {
    const p = popup.querySelector("p");
    const d = popup.querySelectorAll("div");
    if (p) {
      p.style.visibility = "visible";
      p.classList.add("animate__animated", "animate__fadeIn");
    }
    if (d) {
      d.forEach((div) => {
        div.style.visibility = "visible";
        div.classList.add("animate__animated", "animate__fadeIn");
      });
    }
  });
  popup.style.display = "flex";
}

// rearranges the interface after clicking a button
function rearrange(e) {
  const btns = document.querySelectorAll("button");
  const btn = e.target;
  let xTranslate, yTranslate;

  // button is options or how to play
  if (btn.id === "opt-btn" || btn.id === "htp-btn") {
    origTransform = btn.style.transform;
    xTranslate = btn.id === "opt-btn" ? 29 : -29;
    yTranslate = -30;

    btn.style.transform =
      `translateY(${yTranslate}vh)` + `translateX(${xTranslate}vw)`;

    // take care of all other buttons
    btns.forEach((iter) => {
      iter.classList.remove("cue");
      if (
        iter !== btn &&
        !iter.classList.contains("close-btn") &&
        !iter.classList.contains("arrow")
      ) {
        iter.classList.remove("animate__fadeInUp");
        iter.classList.add("animate__fadeOutDown");
      }
      iter.disabled =
        iter.classList.contains("close-btn") || iter.classList.contains("arrow")
          ? false
          : true;
    });

    // expand menu of selected button
    expand(btn.id);

    // fade out header and change background color
    h1.classList.add("animate__fadeOutUp", "animate__animated");
    h1.addEventListener(
      "animationend",
      () => (h1.style.visibility = "hidden"),
      { once: true }
    );
    h1.classList.remove("animated");
    main.classList.add("darken");
  } // button is a close button
  else {
    const popup = btn.parentNode;
    const p = popup.querySelector("p");
    const d = popup.querySelectorAll("div");
    if (p) {
      p.style.visibility = "hidden";
    }
    if (d) {
      d.forEach((div) => {
        div.style.visibility = "hidden";
      });
    }
    popup.classList.add("scale-out-ver-top");
    popup.addEventListener(
      "animationend",
      () => {
        // remove popup from render
        popup.style.display = "none";
        popup.classList.remove("scale-out-ver-top");

        // move button back
        const btnToMove =
          btn.parentNode.id === "opt-popup"
            ? document.getElementById("opt-btn")
            : document.getElementById("htp-btn");
        btnToMove.style.transform = origTransform;

        btnToMove.addEventListener(
          "transitionend",
          () => {
            btns.forEach((iter) => {
              iter.classList.add("cue");
              if (
                iter !== btnToMove &&
                !iter.classList.contains("close-btn") &&
                !iter.classList.contains("arrow")
              ) {
                iter.classList.add("animate__fadeInUp", "animate__faster");
                iter.addEventListener(
                  "animationend",
                  () => {
                    iter.classList.remove(
                      "animate__fadeInUp",
                      "animate__faster"
                    );
                    btnToMove.disabled = false;
                    iter.disabled = false;
                  },
                  { once: true }
                );
                iter.classList.remove("animate__fadeOutDown");
              }
            });
          },
          { once: true }
        );

        // change background color and get back headers
        h1.style.visibility = "visible";
        h1.classList.remove("animate__fadeOutUp");
        h1.classList.add("animate__fadeInDown");
        h1.addEventListener(
          "animationend",
          () => h1.classList.add("animated"),
          { once: true }
        );
        main.classList.remove("darken");
      },
      { once: true }
    );
  }
}

function playSound(e) {
  // if (!e.target.classList.contains("close-btn")) {
  //     let audio = new Audio("../assets/sounds/button-pressed.mp3");
  //     audio.play();
  // }
}

function startGame() {
  // TO BE IMPLEMENTED
  main.classList.add("puff-out-center");
  main.addEventListener("animationend", () => {
    main.style.display = "none";
  });
  canvas.style.display = "block";
  canvas.classList.add("puff-in-center");
  topBar.style.display = "block";
  topBar.classList.add("puff-in-center");
  // ********************* THE ENTRY POINT OF YOUR WHOLE PROGRAM STARTS HERE *********************
  // Indicate which element on the page you want the Canvas_Widget to replace with a 3D WebGL area:
  const element_to_replace = document.querySelector("#main-canvas");
  // Import the file that defines a scene.
  const scenes = [Main_Scene, ...Additional_Scenes].map((scene) => new scene());
  new Canvas_Widget(element_to_replace, scenes);
}

//
// SETUP
//
const h1 = document.getElementById("title");
const main = document.getElementById("main");
const canvas = document.getElementById("main-canvas");
const topBar = document.getElementById("top-bar");
let origTransform;

// export this for use in game canvas
export let config = {
  // default values
  difficulty: "easy",
  strafe: false,
  scatter: 1,
  timer: 30,
};

const options = {
  difficulty: ["easy", "medium", "hard"],
  strafe: [false, true],
  scatter: [1, 3, 5],
  timer: [30, 60, 90, 120],
};

const indexes = {};
const opts = document.querySelectorAll("h3");
opts.forEach((opt) => {
  indexes[opt.id] = 0;
});

// ticking "_"
if (h1) {
  const change_ = setInterval(() => {
    h1.textContent =
      h1.textContent == "ULTRA RAPID FIRE_"
        ? "ULTRA RAPID FIRE "
        : "ULTRA RAPID FIRE_";
  }, 500);
}

// hide topBar and start animating (gradient) of header and main
main.classList.add("animated");
h1.classList.add("animated");
topBar.classList.add("animated");

// get all buttons and make them clickable
const btns = document.querySelectorAll("button");
if (btns.length !== 0) {
  btns.forEach((btn) => {
    btn.classList.add("animate__animated");
    btn.classList.add("cue");
    // btn.addEventListener("click", playSound);
    if (btn.id === "start-btn") {
      btn.addEventListener("click", startGame);
    } else if (btn.classList.contains("arrow")) {
      btn.addEventListener("click", changeOpt);
      btn.classList.remove("animate__animated");
    } else {
      btn.addEventListener("click", rearrange);
    }
  });
}

//
// END OF SETUP
//
