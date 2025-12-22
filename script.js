const images = ["img1", "img2", "img3", "img4", "img5"];
const container = document.querySelector(".flex");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const heading = document.getElementById("h");
const para = document.getElementById("para");

let selected = [];

// pick one image randomly to duplicate
const duplicate =
  images[Math.floor(Math.random() * images.length)];

// create array of 6 images (5 unique + 1 duplicate)
const allImages = [...images, duplicate];

// shuffle images
allImages.sort(() => Math.random() - 0.5);

// render images
allImages.forEach((cls) => {
  const img = document.createElement("img");
  img.classList.add(cls);

  img.addEventListener("click", () => {
    if (selected.length >= 2 || img.classList.contains("selected")) return;

    img.classList.add("selected");
    selected.push(img);

    resetBtn.style.display = "inline-block";

    if (selected.length === 2) {
      verifyBtn.style.display = "inline-block";
    }
  });

  container.appendChild(img);
});

// reset logic
resetBtn.addEventListener("click", () => {
  selected = [];
  para.innerText = "";
  heading.innerText =
    "Please click on the identical tiles to verify that you are not a robot.";

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  document.querySelectorAll("img").forEach((img) => {
    img.classList.remove("selected");
  });
});

// verify logic
verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selected[0].className === selected[1].className) {
    para.innerText = "You are a human. Congratulations!";
  } else {
    para.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
});
