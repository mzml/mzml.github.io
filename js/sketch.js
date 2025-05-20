
let pattern = [];
let colors;
let segmentHeight;
let patternWidth;
let t = 0;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");
  
  // Base colors
  colors = [
    color(0), // Black
    color('#d24317'), // Orange accent
  ];
  
  patternWidth = 30;
  segmentHeight = height/2;
  
  // Generate random pattern parameters
  generatePattern();
  
  loop();
}

function generatePattern() {
  pattern = [];
  for(let i = 0; i < 6; i++) {
    pattern.push({
      offset: random(-10, 10),
      scale: random(0.8, 1.2),
      rotation: random(-PI/16, PI/16),
      speed: random(0.001, 0.003)
    });
  }
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
  segmentHeight = height/2;
}

function drawSegment(x, y, params) {
  push();
  translate(x, y);
  rotate(params.rotation + sin(t * params.speed) * 0.1);
  scale(params.scale);
  
  noFill();
  stroke(colors[0]);
  strokeWeight(2);
  
  // Draw the vertical pattern
  beginShape();
  // Top diamond
  vertex(0, -15 + params.offset);
  vertex(10, 0 + params.offset);
  vertex(0, 15 + params.offset);
  vertex(-10, 0 + params.offset);
  endShape(CLOSE);
  
  // Middle section
  line(-5, 15 + params.offset, -5, 25 + params.offset);
  line(5, 15 + params.offset, 5, 25 + params.offset);
  
  // Bottom curves
  bezier(-5, 25 + params.offset, -10, 30 + params.offset, -10, 35 + params.offset, -5, 40 + params.offset);
  bezier(5, 25 + params.offset, 10, 30 + params.offset, 10, 35 + params.offset, 5, 40 + params.offset);
  
  pop();
}

function drawLogo() {
  background(255, 255, 255, 0);
  
  // Draw pattern instances across the canvas
  for(let x = patternWidth; x < width; x += patternWidth * 2) {
    for(let i = 0; i < pattern.length; i++) {
      drawSegment(x, height/2, pattern[i]);
    }
  }
  
  t += 0.05;
}

function draw() {
  drawLogo();
}

function mousePressed() {
  generatePattern();
}

const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(
        "animate__animated",
        "animate__bounceIn"
      );
    }
  });
});

elementsToAnimate.forEach((element) => {
  observer.observe(element);
});
