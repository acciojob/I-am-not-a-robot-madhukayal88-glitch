const images = ['img1', 'img2', 'img3', 'img4', 'img5'];
const container = document.getElementById('image-container');
const h = document.getElementById('h');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');

let selectedTiles = [];
let originalImages = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    // 1. Create the list of images with one duplicate
    const allImages = [...images];
    const duplicateImage = images[Math.floor(Math.random() * images.length)];
    allImages.push(duplicateImage);
    originalImages = allImages; // Store for verification

    // 2. Shuffle the images
    shuffle(allImages);

    // 3. Display images
    container.innerHTML = '';
    allImages.forEach((imgName, index) => {
        const img = document.createElement('img');
        // Placeholder for actual image source. 
        // In a real scenario, you'd use a URL/path like `images/${imgName}.jpg`.
        img.src = `via.placeholder.com{imgName}`; 
        img.dataset.name = imgName;
        img.dataset.index = index;
        img.addEventListener('click', onImageClick);
        container.appendChild(img);
    });

    // Reset state
    selectedTiles = [];
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    para.textContent = '';
    h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
}

function onImageClick(event) {
    const clickedImage = event.target;

    // Do nothing if more than two tiles are already selected or if the same tile is clicked again
    if (selectedTiles.length >= 2 || clickedImage.classList.contains('selected')) {
        return;
    }

    clickedImage.classList.add('selected');
    selectedTiles.push(clickedImage);

    // State 2: At least one tile clicked, show Reset button
    resetBtn.style.display = 'inline-block';

    // State 3: Both tiles clicked, show Verify button
    if (selectedTiles.length === 2) {
        verifyBtn.style.display = 'inline-block';
    }
}

function resetState() {
    selectedTiles.forEach(img => img.classList.remove('selected'));
    selectedTiles = [];
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    para.textContent = '';
    h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
}

function verifyUser() {
    verifyBtn.style.display = 'none'; // State 4: Verify button disappears
    resetBtn.style.display = 'none'; // Hide reset button after verification attempt

    const [img1, img2] = selectedTiles;

    if (img1.dataset.name === img2.dataset.name) {
        para.textContent = "You are a human. Congratulations!";
        // Disable further clicks after success
        document.querySelectorAll('img').forEach(img => img.removeEventListener('click', onImageClick));
    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        // Re-enable clicks but keep state 4 until page reload
    }
}

// Event listeners for buttons
resetBtn.addEventListener('click', resetState);
verifyBtn.addEventListener('click', verifyUser);

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeGame);

