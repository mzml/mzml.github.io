
let gridSize;
let colors;
let rotationOffset;
let patternSizes;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");
  
  // Random rotation offset for each refresh
  rotationOffset = random(TWO_PI);
  
  // Create color palette with random variations
  const baseColor = color('#d24317');
  colors = [
    color(red(baseColor) + random(-20, 20), green(baseColor) + random(-20, 20), blue(baseColor) + random(-20, 20)),
    color('#17d243'),
    color(random(200, 255), random(20, 50), random(50, 100)),
    color('#d29217')
  ];
  
  gridSize = height/2;
  patternSizes = Array(Math.ceil(headerWidth/gridSize)).fill().map(() => random(0.8, 1.2));
  loop();
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
  gridSize = height/2;
}

function drawIslamicPattern(x, y, size, index) {
  push();
  translate(x, y);
  rotate(rotationOffset * index);
  
  // Draw base circle
  noFill();
  strokeWeight(1);
  
  // Draw geometric pattern
  for(let i = 0; i < 8; i++) {
    stroke(colors[i % colors.length]);
    rotate(PI/4 + sin(index) * 0.1);
    line(0, 0, size/2, 0);
    line(size/3, -size/6, size/3, size/6);
  }
  
  // Draw central star
  beginShape();
  for(let i = 0; i < 8; i++) {
    let angle = i * TWO_PI/8;
    let sx = cos(angle) * size/4;
    let sy = sin(angle) * size/4;
    vertex(sx, sy);
  }
  endShape(CLOSE);
  
  pop();
}

function drawLogo() {
  clear();
  
  // Draw repeating pattern with varying sizes
  let index = 0;
  for(let x = gridSize/2; x < width; x += gridSize) {
    drawIslamicPattern(x, height/2, gridSize * patternSizes[index], index);
    index++;
  }
}

function draw() {
  drawLogo();
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
