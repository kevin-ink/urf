import { Main_Scene, Additional_Scenes, Canvas_Widget } from "../main-scene.js";
// import { widgets } from "../tiny-graphics-widgets.js";

// set DEBUG to true to enable debugging mode (skips menu)
// textures will appear red at first cause its loading, its normal
export var DEBUG = false;
export var gameStarted = false;

// export this to be used to play audio files
export const audioFiles = {};

//
// DECLARATIONS
//

const h1 = document.getElementById("title");
const main = document.getElementById("main");
const canvas = document.getElementById("main-canvas");
const topBar = document.getElementById("top-bar");
const canvas_element = document.querySelector("#main-canvas");
const countText = document.createElement("div");
let canvas_widget;
let origTransform;
let count = 3;

//
//   LOAD AUDIO FILES
//

preloadAudio("assets/sounds/mariostart_2.mp3", "countdownSound", 0.1);
preloadAudio(
  "assets/sounds/button-124476-[AudioTrimmer.com].mp3",
  "buttonSound",
  0.3
);
preloadAudio("assets/sounds/spike-planting.mp3", "startBtnSound", 1);

// gun shot
preloadAudio("assets/sounds/gun.mp3", "gunSound1", 0.6);

// hit shot
preloadAudio("assets/sounds/first_kill.mp3", "killSound1", 0.1);
preloadAudio("assets/sounds/first_kill.mp3", "killSound1.1", 0.1);

preloadAudio("assets/sounds/second_kill.mp3", "killSound2", 0.06);
preloadAudio("assets/sounds/third_kill.mp3", "killSound3", 0.06);
preloadAudio("assets/sounds/fourth_kill.mp3", "killSound4", 0.2);

// spike sounds
preloadAudio("assets/sounds/spike_beep_30.mp3", "spike_beep_30", 0.2);
preloadAudio("assets/sounds/spike_beep_60.mp3", "spike_beep_60", 0.2);
preloadAudio("assets/sounds/spike_beep_90.mp3", "spike_beep_90", 0.2);
preloadAudio("assets/sounds/spike_beep_120.mp3", "spike_beep_120", 0.2);
preloadAudio("assets/sounds/spike_explode.mp3", "spike_explode", 0.6);

// easter egg
preloadAudio("assets/sounds/terrible_voiceline.mp3", "terrible", 0.2);





//
// SETUP
//

// export this for use in game canvas
export let config = {
  // default values
  difficulty: "easy",
  strafe: false,
  scatter: 1,
  timer: 30,
};

// edit this to include more options
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

// for countdown
countText.style.display = "none";
document.body.appendChild(countText);
countText.classList.add("countdown", "scale-in-center");

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

if (DEBUG) {
  canvas.style.display = "block";
  main.style.display = "none";
  gameStarted = true;
  config.timer = 100000; // bomb doesn't go boom
  // ********************* THE ENTRY POINT OF YOUR WHOLE PROGRAM STARTS HERE *********************
  // Indicate which element on the page you want the Canvas_Widget to replace with a 3D WebGL area:
  const element_to_replace = document.querySelector("#main-canvas");
  // Import the file that defines a scene.
  const scenes = [Main_Scene, ...Additional_Scenes].map((scene) => new scene());
  canvas_widget = new Canvas_Widget(element_to_replace, scenes);
  topBar.style.display = "block";
}

//
// FUNCTIONS
//

export function preloadAudio(url, key, volume) {
  const audio = new Audio();
  audio.volume = volume;
  audio.src = url;
  audioFiles[key] = audio;
}

export function updateBar(points, accuracy, time) {
  let div = document.getElementById("points");
  div.innerHTML = `${points}<p>pts</p>`;
  div = document.getElementById("accuracy");
  div.textContent = accuracy + "%";
  div = document.getElementById("time");
  div.textContent = time;
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
  // console.log(config);
}

// expands menu for options and how to play
function expand(id) {
  const popup =
    id === "opt-btn"
      ? document.getElementById("opt-popup")
      : document.getElementById("htp-popup");
  popup.classList.add("scale-in-ver-top");
  popup.addEventListener("animationend", () => {
    const p = popup.querySelectorAll("p");
    const d = popup.querySelectorAll("div");
    p.forEach((text) => {
      text.classList.add("animate__animated", "animate__fadeIn");
      text.style.visibility = "visible";
    });
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
    audioFiles["buttonSound"].play();
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
    const p = popup.querySelectorAll("p");
    const d = popup.querySelectorAll("div");
    p.forEach((text) => {
      text.style.visibility = "hidden";
      text.classList.remove("animate__animated", "animate__fadeIn");
    });
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

function countdown() {
  const countdownInterval = setInterval(() => {
    if (count == 3) {
      audioFiles["countdownSound"].play();
    }
    if (count == 0) {
      audioFiles["startBtnSound"].play();
    }
    countText.textContent = count.toString();
    countText.style.display = "block";
    countText.addEventListener("animationend", () => {
      countText.style.display = "none";
    });
    count--;
    if (count < 0) {
      if (config["timer"] == 30){
        audioFiles["spike_beep_30"].play();
      }
      else if (config["timer"] == 60){
        audioFiles["spike_beep_60"].play();
      }
      else if (config["timer"] == 90){
        audioFiles["spike_beep_90"].play();
      }
      else {
        audioFiles["spike_beep_120"].play();
      }
      clearInterval(countdownInterval); // Stop the interval when count goes below 0
      document.body.removeChild(countText); // Remove the countText element from the DOM
      let div = document.getElementById("time");
      div.classList.add("animate__bounceIn", "animate__animated");
      div.style.visibility = "visible";
      gameStarted = true;
    }
  }, 1000); // Interval of 1 second (1000 milliseconds)
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
  const scenes = [Main_Scene, ...Additional_Scenes].map((scene) => new scene());
  canvas_widget = new Canvas_Widget(canvas_element, scenes);
  audioFiles["buttonSound"].play();
  countdown();
}

window.addEventListener("resize", () => {
  if (canvas_element.style.display == "block") {
    canvas_widget.webgl_manager.set_size();
  }
});
