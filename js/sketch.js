let gridSize;
let colors;
let angle;
let t = 0;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");

  // Colors based on the image
  colors = [
    color('#8B4513'),  // Brown
    color('#17d243'),  // Green
    color('#1E90FF'),  // Blue
    color('#FFA500'),  // Orange
    color('#FFFFFF')   // White
  ];

  gridSize = height/2;
  angle = TWO_PI / 12;  // 12-pointed star
  loop();
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
}

function drawStar(x, y, size) {
  push();
  translate(x, y);
  rotate(t * 0.01);

  // Draw main star pattern
  for(let i = 0; i < 12; i++) {
    push();
    rotate(i * angle);
    stroke(colors[i % colors.length]);
    strokeWeight(1);
    noFill();

    // Draw geometric elements
    beginShape();
    vertex(0, 0);
    vertex(size * 0.5, 0);
    vertex(size * 0.4, size * 0.2);
    endShape(CLOSE);

    // Draw connecting lines
    line(size * 0.3, 0, size * 0.3, size * 0.3);
    pop();
  }

  // Draw central circle
  fill(colors[3]);
  noStroke();
  circle(0, 0, size * 0.2);

  pop();
}

function drawLogo() {
  background(255, 255, 255, 0);

  // Draw repeating pattern
  let spacing = gridSize * 1.2;
  for(let x = spacing/2; x < width + spacing; x += spacing) {
    drawStar(x, height/2, gridSize);
  }

  t += 0.1;
}

function draw() {
  drawLogo();
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