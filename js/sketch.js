
let gridSize;
let colors;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");
  
  // Create color palette based on the orange theme
  const baseColor = color('#d24317');
  colors = [
    color('#d24317'),
    color('#17d243'),
    color('#d21769'),
    color('#d29217')
  ];
  
  gridSize = height/2;
  loop();
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
  gridSize = height/2;
}

function drawIslamicPattern(x, y, size) {
  push();
  translate(x, y);
  
  // Draw base circle
  noFill();
  strokeWeight(1);
  
  // Draw geometric pattern
  for(let i = 0; i < 8; i++) {
    stroke(colors[i % colors.length]);
    rotate(PI/4);
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
  
  // Draw repeating pattern
  for(let x = gridSize/2; x < width; x += gridSize) {
    drawIslamicPattern(x, height/2, gridSize);
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
