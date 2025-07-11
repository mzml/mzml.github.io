
let cellSize = 40;
let colors;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");

  // Complementary colors to #d24317 (orange-red), #d24317 (orange-red), and #969eaf (gray-blue)
  generateRandomColors();
  noFill();
  strokeWeight(3);
  noLoop();
}

function generateRandomColors() {
  colors = [
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255)),
    color(random(0, 255), random(0, 255), random(0, 255))
  ];
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
  generateRandomColors();
  drawPattern();
}

function drawPattern() {
  background(255, 255, 255, 0);
  
  for(let x = 0; x < width + cellSize; x += cellSize) {
    push();
    translate(x, height/2);
    
    for(let i = 0; i < colors.length; i++) {
      stroke(colors[i]);
      beginShape();
      let offset = random(-TWO_PI, TWO_PI);
      for(let x = -cellSize; x <= cellSize; x += 5) {
        let y = sin(x * 0.1 + offset) * random(15, 25);
        vertex(x, y);
      }
      endShape();
    }
    pop();
  }
}

function draw() {
  drawPattern();
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
