// setup
const h1 = document.getElementById("title");
const main = document.getElementById("main");
const canvas = document.getElementById("main-canvas");
const topBar = document.getElementById("top-bar");
let origTransform;
topBar.style.display = "none";
main.classList.add("animated");
h1.classList.add("animated");


// ticking "_"
if (h1) 
{
    const change_ = setInterval(() => {
        h1.textContent =
            h1.textContent == "ULTRA RAPID FIRE_"
            ? "ULTRA RAPID FIRE "
            : "ULTRA RAPID FIRE_";
    }, 500);
}

// expands menu for options and how to play
function expand(id) 
{
    const popup = id === 'opt-btn' ? document.getElementById("opt-popup") : document.getElementById("htp-popup");
    popup.classList.add("scale-in-ver-top");
    popup.addEventListener("animationend", () => 
    {
        const p = popup.querySelector('p');
        if (p) {
            p.style.visibility = 'visible';
            p.classList.add("animate__animated", "animate__fadeIn");
        }
    })
    popup.style.display = "block";
}

// rearranges the interface after clicking a button
function rearrange(e) 
{
    const btns = document.querySelectorAll("button");
    const btn = e.target;
    let xTranslate, yTranslate;

    if (btn.id === "opt-btn" || btn.id === "htp-btn") // button is options or how to play
        {
            origTransform = btn.style.transform;
            xTranslate = btn.id === "opt-btn" ? 29 : -29;
            yTranslate = -30;
            btn.style.transform = `translateY(${yTranslate}vh)` + `translateX(${xTranslate}vw)`;
            // take care of all other buttons
            btns.forEach((iter) => 
            {
                iter.classList.remove("cue");
                if (iter !== btn && !iter.classList.contains('close-btn')) 
                {
                    iter.classList.remove("animate__fadeInUp");
                    iter.classList.add("animate__fadeOutDown");
                }
                iter.disabled = iter.classList.contains('close-btn') ? false : true;
            })

            // expand menu of selected button
            expand(btn.id);

            // fade out header and change background color
            h1.classList.add("animate__fadeOutUp", "animate__animated");
            h1.addEventListener("animationend", () => h1.style.visibility = 'hidden', {once : true});
            h1.classList.remove("animated");
            main.classList.add("darken");
        }
        else // button is a close button
        {
            const popup = btn.parentNode;
            const p = popup.querySelector('p');
            if (p) {
                p.style.visibility = 'hidden';
            }
            popup.classList.add("scale-out-ver-top");
            popup.addEventListener("animationend", () => 
            {
                // remove popup from render
                popup.style.display = "none";
                popup.classList.remove("scale-out-ver-top");
                
                // move button back
                const btnToMove = btn.parentNode.id === "opt-popup" ? document.getElementById("opt-btn") : document.getElementById("htp-btn");
                btnToMove.style.transform = origTransform;

                btnToMove.addEventListener("transitionend", () => {
                    
                    btns.forEach((iter) => {
                        iter.classList.add("cue");
                        if (iter !== btnToMove && !iter.classList.contains("close-btn")) 
                        {
                            iter.classList.add("animate__fadeInUp", "animate__faster");
                            iter.addEventListener("animationend", () => 
                            {
                                iter.classList.remove("animate__fadeInUp", "animate__faster");
                                btnToMove.disabled = false;
                                iter.disabled = false;
                                
                            }, {once: true});
                            iter.classList.remove("animate__fadeOutDown");
                        }
                    })
                }, {once: true})

                // change background color and get back headers
                h1.style.visibility = 'visible';
                h1.classList.remove("animate__fadeOutUp");
                h1.classList.add("animate__fadeInDown");
                h1.addEventListener("animationend", () => h1.classList.add("animated"), {once : true});
                main.classList.remove("darken");

            }, {once : true});
        }
    }

function playSound(e)
{
    // if (!e.target.classList.contains("close-btn")) {
    //     let audio = new Audio("../assets/sounds/button-pressed.mp3");
    //     audio.play();
    // }
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
        btn.classList.add("animate__animated");
        btn.classList.add("cue");
        // btn.addEventListener("click", playSound);
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

// 
// Spaghettier code below for debugging/reference purposes
//
    // btns.forEach((iter) => 
    // {
    //     iter.disabled = true;
    //     iter.classList.remove("cue");

    //     if (iter === btn) // clicked button
    //     {
    //         if (iter.id === "opt-btn" || iter.id === "htp-btn") // button is options or how to play
    //         {
    //             xTranslate = iter.id === "opt-btn" ? 29 : -29;
    //             yTranslate = -30;
    //             iter.style.transform = `translateY(${yTranslate}vh)` + `translateX(${xTranslate}vw)`;

    //             // fade out header and change background color
    //             h1.classList.add("animate__fadeOutUp", "animate__animated");
    //             h1.addEventListener("animationend", () => h1.style.visibility = 'hidden', {once : true});
    //             h1.classList.remove("animated");
    //             main.classList.add("darken");

    //             btns.forEach((iter))
                
    //             expand(btn);
    //         }
    //         else // button is a close button
    //         {
    //             const popup = iter.parentNode;
    //             const p = popup.querySelector('p');
    //             p.style.visibility = 'hidden';
    //             popup.classList.add("scale-out-ver-top");
    //             popup.addEventListener("animationend", () => 
    //             {
    //                 popup.style.display = "none";
    //                 main.classList.remove("darken");
    //                 // change background color and get back headers
    //                 h1.style.visibility = 'visible';
    //                 h1.classList.remove("animate__fadeOutUp");
    //                 h1.classList.add("animate__fadeInDown");
    //                 h1.addEventListener("animationend", () => h1.classList.add("animated"), {once : true});
    //                 iter = iter.parentNode.id === "opt-popup" ? document.getElementById("opt-btn") : document.getElementById("htp-btn");
    //                 xTranslate = iter.parentNode.id === "opt-popup" ? 29 : -29;
    //                 yTranslate = -30;
    //                 iter.style.transform = `translateY(${yTranslate}vh)` + `translateX(${xTranslate}vw)`;
    //                 iter.addEventListener("animationend", () =>{
    //                     btns.forEach((it) => {
    //                         iter.classList.remove("animate__fadeOutDown");
    //                         iter.classList.add("animate__fadeInUp");
    //                         iter.classList.disabled = false;
    //                     })
    //                 }, {once : true})
    //             }, {once : true}) 
    //         }
    //     }
    //     else if (!iter.classList.contains("close-btn")) // not close button
    //     {
    //         if (btn.classList.contains("close-btn")) { // if clicked button is close button
    //             iter.classList.remove("animate__fadeOutDown");
    //             iter.classList.add("animate__fadeInUp");
    //             iter.classList.disabled = false;
    //         }
    //         else
    //         {
    //             iter.classList.add("animate__fadeOutDown");
    //             iter.classList.remove("animate__fadeInUp");
    //         }
    //     }
    //     else // if close button, make sure close button is not disabled
    //     {
    //         iter.disabled = false;
    //     }
    // })
    /*
    // iterate through all buttons 
    btns.forEach((iter) => {
        // disable buttons and cue while rearranging
        
        iter.classList.remove("cue");

        // move clicked button
        if (iter === btn) {
            let xTranslate; const yTranslate = iter.classList.contains("close-btn") ? 30 : -30;
            if (iter.id === "opt-btn" || iter.parentNode.id === 'htp-popup')
            {
                xTranslate = 29;
            }
            else 
            {
                xTranslate = -29;
            }
            if (iter.classList.contains("close-btn")) {iter.classList.add("close-transform")};
            iter.style.transform = `translateY(${yTranslate}vh)` + `translateX(${xTranslate}vw)`;
            if (undo) 
            {
                iter.addEventListener("animationend", () => iter.classList.add("cue"));
            }
        }
        else // all other buttons will be faded away
        {
            if (undo) {
                iter.classList.remove("animate__fadeOutDown");
                iter.classList.add("animate__fadeInDown");
                iter.classList.add("cue");
                iter.disabled = false;
            }
            else
            {
                if (!iter.classList.contains("close-btn")) {
                    iter.classList.remove("animate__fadeInDown");
                    iter.classList.add("animate__fadeOutDown");
                }
                else
                {
                    iter.disabled = false;
                }
            }
        }
    });
    if (btn.classList.contains("close-btn")) 
    {
        closePopup(btn);
        h1.classList.remove("animate__fadeOutDown");
        h1.classList.add("animate__fadeInDown");
        h1.addEventListener("animationend", () => h1.classList.add("animated"));
        main.classList.remove("darken");
    }
    else 
    {
        expand(btn.id);
        h1.classList.remove("animated");
        h1.classList.add("animate__fadeOutDown");
        main.classList.add("darken");
    }
    */

