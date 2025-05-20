
let lines = [];
let colors;
let t = 0;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");
  
  // Complementary colors
  colors = [
    color('#d24317'), // Original orange
    color('#17d243'), // Complement 1
    color('#969eaf')  // Specified gray
  ];
  
  // Generate random lines
  generateLines();
  
  loop();
}

function generateLines() {
  lines = [];
  for(let i = 0; i < 15; i++) {
    lines.push({
      y: random(height),
      speed: random(0.5, 2),
      amplitude: random(5, 15),
      color: colors[floor(random(colors.length))]
    });
  }
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
  generateLines();
}

function drawLogo() {
  background(255, 255, 255, 0);
  
  for(let line of lines) {
    stroke(line.color);
    strokeWeight(2);
    noFill();
    
    beginShape();
    for(let x = 0; x < width; x += 20) {
      let y = line.y + sin(x * 0.01 + t * line.speed) * line.amplitude;
      curveVertex(x, y);
    }
    endShape();
  }
  
  t += 0.02;
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
