// Setup the canvas
const canvas = document.getElementById('balloonCanvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match the window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Messages and their color schemes with white text for all banners
const messages = [
  {
    text: "HAPPY BIRTHDAY !!",
    bgColor: "#ff66cc", // Light pink background
    textColor: "white" // White text
  },
  {
    text: "Let's have some fun !!",
    bgColor: "#008080", // Teal background
    textColor: "white" // White text
  },
  {
    text: "We are gonna ROCK this !!!",
    bgColor: "#4B0082", // Dark purple background
    textColor: "white" // White text
  }
];

let currentMessageIndex = 0;

// Function to create and center the banner
function createBanner() {
  const banner = document.createElement('h1');
  banner.style.position = 'absolute';
  banner.style.top = '50%';
  banner.style.left = '50%';
  banner.style.transform = 'translate(-50%, -50%)';
  banner.style.padding = '10px 20px';
  banner.style.fontSize = '48px';
  banner.style.fontWeight = 'bold';
  banner.style.borderRadius = '20px';
  banner.style.textAlign = 'center';
  banner.style.textShadow = '2px 2px 4px #000';
  banner.style.zIndex = '2'; // Ensures the banner is above the canvas
  banner.style.animation = 'flutter 2s ease-in-out infinite alternate';
  document.body.appendChild(banner);
  return banner;
}

// Function to update the banner content and styles
function updateBanner(banner) {
  const currentMessage = messages[currentMessageIndex];
  banner.innerText = currentMessage.text;
  banner.style.backgroundColor = currentMessage.bgColor;
  banner.style.color = currentMessage.textColor;

  // Update the index to loop through messages
  currentMessageIndex = (currentMessageIndex + 1) % messages.length;
}

// Call the function to create the banner
const banner = createBanner();

// Function to cycle messages every 5 seconds
setInterval(() => {
  updateBanner(banner);
}, 5000);

// Initialize with the first message
updateBanner(banner);

// Balloon animation code remains the same
const balloonColors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange'];

// Create balloon objects with 2 types of shapes and properties
const balloons = Array.from({ length: 30 }, (_, index) => {
  const shapeType = index % 2; // Alternate between 2 shapes
  return {
    x: Math.random() * canvas.width, // Random x-position
    y: canvas.height + Math.random() * canvas.height, // Start offscreen
    radius: 30 + Math.random() * 20, // Random size
    color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
    speed: 1 + Math.random() * 2, // Random speed for floating up
    shapeType: shapeType // Group 1: circle, Group 2: wide top
  };
});

// Function to draw a circular balloon (original style)
function drawCircularBalloon(balloon) {
  ctx.beginPath();
  ctx.arc(balloon.x, balloon.y, balloon.radius, 0, Math.PI * 2);
  ctx.fillStyle = balloon.color;
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw string
  drawBalloonString(balloon);
}

// Function to draw a balloon that is wider at the top and thinner at the bottom
function drawWideTopBalloon(balloon) {
  ctx.beginPath();
  ctx.ellipse(balloon.x, balloon.y, balloon.radius * 0.8, balloon.radius * 1.2, 0, 0, Math.PI * 2); // Upright ellipse
  ctx.fillStyle = balloon.color;
  ctx.fill();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw string
  drawBalloonString(balloon);
}

// Function to draw a fluttery string at the bottom of each balloon
function drawBalloonString(balloon) {
  ctx.beginPath();
  let x = balloon.x; // Start at the bottom center of the balloon
  let y = balloon.y + balloon.radius;
  let segmentLength = 10; // Length of each string segment
  let waveAmplitude = 5; // Amplitude of the wave for string

  for (let i = 0; i < 5; i++) { // 5 segments of the string
    let newX = x + (i % 2 === 0 ? waveAmplitude : -waveAmplitude); // Create a zigzag pattern
    let newY = y + segmentLength;
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    x = newX;
    y = newY;
  }

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;
  ctx.stroke();
}

// Function to animate the balloons
function animateBalloons() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  balloons.forEach(balloon => {
    // Draw based on shape type
    if (balloon.shapeType === 0) {
      drawCircularBalloon(balloon); // Draw normal circular balloon
    } else {
      drawWideTopBalloon(balloon); // Draw balloon wider at the top
    }

    balloon.y -= balloon.speed; // Move balloon upward

    // Reset balloon position when it moves off-screen
    if (balloon.y + balloon.radius < 0) {
      balloon.y = canvas.height + balloon.radius; // Move back to bottom
      balloon.x = Math.random() * canvas.width; // Random x-position again
    }
  });

  requestAnimationFrame(animateBalloons); // Loop the animation
}

// Handle window resizing
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Start the balloon animation
animateBalloons();
