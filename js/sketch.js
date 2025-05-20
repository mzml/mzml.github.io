
let cellSize = 40;
let colors;
let drawProgress = 0;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, windowHeight * 0.2);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");

  generateRandomColors();
  noFill();
  strokeWeight(3);
  loop();
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
  resizeCanvas(headerWidth, windowHeight * 0.2);
  generateRandomColors();
  drawProgress = 0;
}

function drawPattern() {
  background(255, 255, 255, 0);
  
  for(let x = 0; x < drawProgress; x += cellSize) {
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
  
  if(drawProgress < width + cellSize) {
    drawProgress += 20;
  } else {
    noLoop(); // Stop the animation once it reaches the end
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
