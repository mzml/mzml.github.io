let t = 0;
let cellSize = 40;
let colors;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");

  colors = [
    color('#1E90FF'), // Blue
    color('#FFA500'), // Orange
    color('#50C878'), // Green
    color('#8B4513'), // Brown
    color('#FFFFFF')  // White
  ];

  noFill();
  strokeWeight(3);
  loop();
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
}

function drawInterlacingPattern(x, y) {
  push();
  translate(x, y);

  // Draw the interlacing lines
  for(let i = 0; i < colors.length - 1; i++) {
    stroke(colors[i]);
    beginShape();
    for(let x = -cellSize; x <= cellSize; x += 5) {
      let y = sin(x * 0.1 + t + i * TWO_PI/4) * 20;
      vertex(x, y);
    }
    endShape();
  }

  pop();
}

function draw() {
  background(255, 255, 255, 0);

  // Create continuous pattern across width
  for(let x = 0; x < width + cellSize; x += cellSize) {
    drawInterlacingPattern(x, height/2);
  }

  t += 0.02;
}

const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate__animated", "animate__bounceIn");
    }
  });
});

elementsToAnimate.forEach((element) => {
  observer.observe(element);
});