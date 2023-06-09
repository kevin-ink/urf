import { Main_Scene, Additional_Scenes, Canvas_Widget } from "../main-scene.js";
// import { widgets } from "../tiny-graphics-widgets.js";

// set DEBUG to true to enable debugging mode (skips menu)
// textures will appear red at first cause its loading, its normal
var DEBUG = false;

//
// DECLARATIONS
//

// export this to be used to play audio files
export const audioFiles = {};
// export this to tell canvas game has started
export var gameStarted = false;
// this prevents endGame() from being called too many times
// alternatively Leo can call endGame() only once
let end = false; // decided to keep this cause canvas DOES NOT RESET!!!
// game end stats "points" and "accuracy"
let stats = {};
let scoreInterval;

// get all important elements
const h1 = document.getElementById("title");
const main = document.getElementById("main");
const canvas = document.getElementById("main-canvas");
const topBar = document.getElementById("top-bar");
const img = document.getElementById("urf");

// countdown, change countFrom if needed
const countFrom = 3;
let count = countFrom;
const countText = document.createElement("div");

//
// SETUP
//

// replace this with canvas
const canvas_element = document.querySelector("#main-canvas");

let canvas_widget; // Canvas_Widget
let origTransform; // stores the previous transformation so to revert

// export this for use in game canvas
export let config = {
  // default values
  difficulty: "easy",
  strafe: false,
  scatter: 1,
  timer: 30,
};

// options available to player
const options = {
  difficulty: ["easy", "medium", "hard"],
  strafe: [false, true],
  scatter: [1, 3, 5],
  timer: [30, 60, 90, 120],
};

// for options
const indexes = {};
const opts = document.querySelectorAll("h3");

//
//  MAIN FUNCTION CALL
//
(() => {
  preloadAudioFiles();
  getDebug();
  setup();
})();

//
//  LOAD AUDIO FILES
//  add audio files as necessary to this function
function preloadAudioFiles() {
  preloadAudio("assets/sounds/button-124476.mp3", "buttonSound", 0.4);
  preloadAudio("assets/sounds/spike-planting.mp3", "startBtnSound", 1);
  preloadAudio("assets/sounds/click-button-140881.mp3", "changeOptSound", 1);
  preloadAudio("assets/sounds/soft-click.mp3", "cancelSound", 1);
  preloadAudio("assets/sounds/computer-calculating.mp3", "calculateSound", 0.2);
  preloadAudio("assets/sounds/valorantLobby.mp3", "statsScreenSound", 0.3);
  preloadAudio("assets/sounds/mariostart_2.mp3", "countdownSound", 0.1);

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
}

//
// SETUP
//

function setup() {
  // ticking "_" for ULTRA RAPID FIRE_
  // may be memory intensive?
  if (h1) {
    setInterval(() => {
      h1.textContent =
        h1.textContent == "ULTRA RAPID FIRE_"
          ? "ULTRA RAPID FIRE "
          : "ULTRA RAPID FIRE_";
    }, 500);
  }
  opts.forEach((opt) => {
    indexes[opt.id] = 0;
  });

  // hide topBar and start animating (gradient) of header and main
  main.classList.add("animated");
  h1.classList.add("animated");

  // for countdown
  countText.style.visibility = "hidden";
  document.body.appendChild(countText);
  countText.classList.add("countdown");

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
      } else if (btn.id === "close-stats") {
        btn.addEventListener("click", closeStats);
      } else {
        btn.addEventListener("click", rearrange);
      }
    });
  }
}

// start game as debug if debug is on
function getDebug() {
  if (DEBUG) {
    canvas.style.display = "block";
    main.classList.add("hide");
    img.classList.add("hide");
    gameStarted = true;
    const div = document.getElementById("time");
    div.style.visibility = "visible";
    config.timer = 100000; // adjust as necessary
    const element_to_replace = document.querySelector("#main-canvas");
    const scenes = [Main_Scene].map((scene) => new scene());
    canvas_widget = new Canvas_Widget(element_to_replace, scenes);
    topBar.style.display = "block";
  }
}

//
// FUNCTIONS
//

// performs start game functions
function startGame() {
  main.classList.add("puff-out-center");
  main.addEventListener(
    "animationend",
    () => {
      main.classList.add("hide");
      img.classList.add("hide");
      main.classList.remove("puff-out-center");
    },
    { once: true }
  );
  const timeDiv = document.getElementById("time");
  timeDiv.style.visibility = "hidden";
  canvas.style.display = "block";
  canvas.classList.add("puff-in-center");
  canvas.addEventListener(
    "animationend",
    () => {
      canvas.classList.remove("puff-in-center");
    },
    { once: true }
  );
  topBar.style.display = "block";
  topBar.classList.add("puff-in-center");
  topBar.addEventListener(
    "animationend",
    () => {
      topBar.classList.remove("puff-in-center");
    },
    { once: true }
  );
  const scenes = [Main_Scene].map((scene) => new scene());
  canvas_widget = new Canvas_Widget(canvas_element, scenes);
  audioFiles["buttonSound"].play();
  countdown();
  end = false;
}

// performs game ended functions
export function endGame() {
  if (!end) {
    // stop sounds
    if (config["timer"] == 30) {
      audioFiles["spike_beep_30"].pause();
      audioFiles["spike_beep_30"].currentTime = 0;
    } else if (config["timer"] == 60) {
      audioFiles["spike_beep_60"].pause();
      audioFiles["spike_beep_60"].currentTime = 0;
    } else if (config["timer"] == 90) {
      audioFiles["spike_beep_90"].pause();
      audioFiles["spike_beep_90"].currentTime = 0;
    } else {
      audioFiles["spike_beep_120"].pause();
      audioFiles["spike_beep_120"].currentTime = 0;
    }
    end = true;
    gameStarted = false;
    topBar.style.display = "none";
    canvas.classList.add("animate__animated", "animate__fadeOut");
    canvas.addEventListener(
      "animationend",
      () => {
        // rewrite popup text based on accuracy
        const h4 = document.querySelector("h4");
        if (
          stats["accuracy"] >= 90 &&
          stats["points"] >= config["timer"] * 5500
        ) {
          h4.textContent = "YOUR A PRO!";
        } else if (
          stats["accuracy"] >= 80 &&
          stats["points"] >= config["timer"] * 4000
        ) {
          h4.textContent = "NICE AIM!";
        } else if (
          stats["accuracy"] >= 60 &&
          stats["points"] >= config["timer"] * 3000
        ) {
          h4.textContent = "GOOD ROUND!";
        } else if (
          stats["accuracy"] >= 30 &&
          stats["points"] >= config["timer"] * 1000
        ) {
          h4.textContent = "KEEP AT IT!";
        } else {
          h4.textContent = "ACTUALLY TRY?";
        }

        // rewrite current settings ahead of time (before display)
        const settingsElement = document.getElementById("settingsText");
        const timer = config["timer"];
        const scatter = config["scatter"];
        const difficulty = config["difficulty"];
        const strafe = config["strafe"] == true ? "on" : "off";
        settingsElement.textContent = `Settings for this round: ${timer} seconds,
        strafe ${strafe}, ${difficulty} difficulty, scatter ${scatter}`;

        // fade out header
        h1.classList.add("animate__fadeOutUp", "animate__animated");
        h1.addEventListener(
          "animationend",
          () => {
            h1.style.visibility = "hidden";
            h1.classList.remove("animate__fadeOutUp", "animate__animated");
          },
          { once: true }
        );
        h1.classList.remove("animated");

        // hide buttons
        const btns = document.querySelectorAll("button");
        btns.forEach((iter) => {
          iter.classList.remove("cue");
          if (
            !iter.classList.contains("close-btn") &&
            !iter.classList.contains("arrow")
          ) {
            iter.classList.remove("animate__fadeInUp");
            iter.classList.add("animate__fadeOutDown");
          }
          iter.disabled =
            iter.classList.contains("close-btn") ||
            iter.classList.contains("arrow")
              ? false
              : true;
        });
        // change background but keep header
        main.classList.add("darken");
        main.classList.remove("hide");
        main.classList.add("puff-in-center");
        main.addEventListener(
          "animationend",
          () => {
            main.classList.remove("puff-in-center");
            expand();
          },
          { once: true }
        );
        canvas.style.display = "none";
        canvas.classList.remove("animate__animated", "animate__fadeOut");
        canvas_element.innerHTML = "";
      },
      { once: true }
    );
  }
}

// shows the correct stats in stats menu
function showStats() {
  audioFiles["statsScreenSound"].play();
  const statElements = document.querySelectorAll("h5");
  let accuracyStat;
  const finalScore = stats["points"];
  let scoreAccumulate = 0;
  statElements.forEach((stat) => {
    if (stat.classList.contains("accuracy")) {
      accuracyStat = stat;
    } else {
      audioFiles["calculateSound"].play();
      scoreInterval = setInterval(() => {
        if (scoreAccumulate < finalScore) {
          if (scoreAccumulate + finalScore / 100 <= finalScore) {
            scoreAccumulate += finalScore / 100;
          } else {
            scoreAccumulate += finalScore - scoreAccumulate;
          }
          stat.textContent = Math.trunc(scoreAccumulate);
        } else {
          clearInterval(scoreInterval); // Stop the interval when score reached
          setTimeout(() => {
            audioFiles["statsScreenSound"].pause();
            audioFiles["statsScreenSound"].currentTime = 0;
          }, 5350);
          audioFiles["calculateSound"].pause();
          audioFiles["calculateSound"].currentTime = 0;
          accuracyStat.classList.add("puff-in-center");
          const accuracy = stats["accuracy"];
          accuracyStat.textContent = `${accuracy}%`;
          accuracyStat.style.visibility = "visible";
          accuracyStat.addEventListener(
            "animationend",
            () => {
              accuracyStat.classList.remove("puff-in-center");
            },
            {
              once: true,
            }
          );
        }
      }, 10);
    }
  });
}

function closeStats(e) {
  if (scoreInterval) {
    clearInterval(scoreInterval);
  }
  audioFiles["statsScreenSound"].pause();
  audioFiles["statsScreenSound"].currentTime = 0;
  audioFiles["calculateSound"].pause();
  audioFiles["calculateSound"].currentTime = 0;
  audioFiles["cancelSound"].play();
  const popup = e.target.parentNode;
  popup.classList.add("scale-out-ver-top");
  popup.addEventListener(
    "animationend",
    () => {
      // remove popup from render
      popup.style.display = "none";
      popup.classList.remove("scale-out-ver-top");
      const btns = document.querySelectorAll("button");
      btns.forEach((iter) => {
        iter.classList.add("cue");
        if (
          !iter.classList.contains("close-btn") &&
          !iter.classList.contains("arrow")
        ) {
          iter.classList.add("animate__fadeInUp", "animate__faster");
          iter.addEventListener(
            "animationend",
            () => {
              iter.classList.remove("animate__fadeInUp", "animate__faster");
              iter.disabled = false;
            },
            { once: true }
          );
          iter.classList.remove("animate__fadeOutDown");
        }
      });

      // for stats elements reset
      const statElements = document.querySelectorAll("h5");
      statElements.forEach((stat) => {
        if (stat.classList.contains("accuracy")) {
          stat.style.visibility = "hidden";
        } else {
          stat.textContent = 0;
        }
      });
      main.classList.remove("darken");
      img.classList.remove("hide");
      h1.classList.remove("animate__fadeOutUp");
      h1.classList.add("animate__fadeInDown");
      h1.classList.add("animate__animated");
      h1.style.visibility = "visible";
      h1.addEventListener(
        "animationend",
        () => {
          location.reload(); // TEMPORARY FIX
          h1.classList.remove("animate__fadeInDown", "animate__animated");
          h1.classList.add("animated");
        },
        { once: true }
      );
    },
    { once: true }
  );
}

// expands menu for options and how to play
// default
function expand(id = "gameOver") {
  let popup;
  switch (id) {
    case "opt-btn":
      popup = document.getElementById("opt-popup");
      break;
    case "htp-btn":
      popup = document.getElementById("htp-popup");
      break;
    default:
      // default game over popup
      popup = document.getElementById("stats-popup");
  }
  popup.classList.add("scale-in-ver-top");
  popup.style.display = "block";
  popup.addEventListener(
    "animationend",
    () => {
      popup.classList.remove("scale-in-ver-top");
      const p = popup.querySelectorAll("p");
      const d = popup.querySelectorAll("div");
      p.forEach((text) => {
        text.style.visibility = "visible";
      });
      d.forEach((div) => {
        div.style.visibility = "visible";
      });
      if (id === "gameOver") {
        showStats();
      }
    },
    { once: true }
  );
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
      () => {
        h1.style.visibility = "hidden";
        h1.classList.remove("animate__fadeOutUp", "animate__animated");
      },
      { once: true }
    );
    h1.classList.remove("animated");
    main.classList.add("darken");
  } // button is a close button
  else {
    audioFiles["cancelSound"].play();
    const popup = btn.parentNode;
    const p = popup.querySelectorAll("p");
    const d = popup.querySelectorAll("div");
    p.forEach((text) => {
      text.style.visibility = "hidden";
    });
    d.forEach((div) => {
      div.style.visibility = "hidden";
    });
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
        h1.classList.add("animate__animated");
        h1.classList.add("animate__fadeInDown");
        h1.addEventListener(
          "animationend",
          () =>
            h1.classList.remove(
              "animated",
              "animate__fadeInDown",
              "animate__animated"
            ),
          { once: true }
        );
        main.classList.remove("darken");
      },
      { once: true }
    );
  }
}

// does the countdown stuff
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
    countText.addEventListener(
      "animationend",
      () => {
        countText.style.display = "none";
      },
      { once: true }
    );
    if (count > 0) {
      countText.textContent = count.toString();
      countText.classList.add("scale-in-center");
      countText.style.visibility = "visible";
      countText.addEventListener(
        "animationend",
        () => {
          countText.style.visibility = "hidden";
          countText.classList.remove("scale-in-center");
        },
        { once: true }
      );
      count--;
    } else {
      if (config["timer"] == 30) {
        audioFiles["spike_beep_30"].play();
      } else if (config["timer"] == 60) {
        audioFiles["spike_beep_60"].play();
      } else if (config["timer"] == 90) {
        audioFiles["spike_beep_90"].play();
      } else {
        audioFiles["spike_beep_120"].play();
      }
      clearInterval(countdownInterval); // Stop the interval when count goes below 0
      countText.visibility = "hidden";
      const div = document.getElementById("time");
      div.classList.add("animate__bounceIn", "animate__animated");
      div.style.visibility = "visible";
      div.addEventListener(
        "animationend",
        () => {
          div.classList.remove("animate__bounceIn", "animate__animated");
        },
        { once: true }
      );
      gameStarted = true;
      end = false;
      count = countFrom;
    }
  }, 1000); // Interval of 1 second (1000 milliseconds)
}

// preloads audio files
export function preloadAudio(url, key, volume) {
  const audio = new Audio();
  audio.volume = volume;
  audio.src = url;
  audioFiles[key] = audio;
}

// updates in-game ui
export function updateBar(points, accuracy, time) {
  stats["points"] = points;
  stats["accuracy"] = accuracy;
  let div = document.getElementById("points");
  div.innerHTML = `${points}<p>pts</p>`;
  div = document.getElementById("accuracy");
  div.textContent = accuracy + "%";
  div = document.getElementById("time");
  div.textContent = time;
}

// changes options accordingly
function changeOpt(e) {
  // plays audio, ensures that it plays multiple times correctly if clicking
  // really fast
  if (audioFiles["changeOptSound"].paused) {
    audioFiles["changeOptSound"].currentTime = 0;
    audioFiles["changeOptSound"].play();
  } else {
    audioFiles["changeOptSound"].pause();
    audioFiles["changeOptSound"].currentTime = 0;
    audioFiles["changeOptSound"].play();
  }
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
}

// for resizing
window.addEventListener("resize", () => {
  if (canvas_element.style.display == "block") {
    canvas_widget.webgl_manager.set_size();
  }
});
