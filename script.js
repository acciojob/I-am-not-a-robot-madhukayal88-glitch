const tilesDiv = document.getElementById("tiles");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const msg = document.getElementById("h");
const para = document.getElementById("para");

let clicked = [];

// base images
let images = [
  "https://via.placeholder.com/100?text=1",
  "https://via.placeholder.com/100?text=2",
  "https://via.placeholder.com/100?text=3",
  "https://via.placeholder.com/100?text=4",
  "https://via.placeholder.com/100?text=5"
];

// pick one image randomly to duplicate
const duplicate = images[Math.floor(Math.random() * images.length)];
images.push(duplicate);

// shuffle images
images.sort(() => Math.random() - 0.5);

// render images
images.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;

  img.addEventListener("click", () => {
    if (clicked.length >= 2 || img.classList.contains("selected")) return;

    img.classList.add("selected");
    clicked.push(img);

    resetBtn.style.display = "inline-block";

    if (clicked.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  });

  tilesDiv.appendChild(img);
});

// reset
resetBtn.addEventListener("click", () => {
  clicked = [];
  para.innerText = "";
  msg.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";

  document.querySelectorAll("img").forEach((img) => {
    img.classList.remove("selected");
  });
});

// verify
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (clicked[0].src === clicked[1].src) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
