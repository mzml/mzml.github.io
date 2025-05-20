
let angle;
let colors;
let numShapes = 16;
let rotationSpeed = 0.001;

function setup() {
  const headerWidth = document.getElementById("header").offsetWidth;
  let canvas = createCanvas(headerWidth, 64);
  canvas.id("logo-canvas");
  canvas.parent("logo-container");
  
  angle = TWO_PI / numShapes;
  
  // Color palette inspired by Islamic art
  colors = [
    color('#1a237e'), // Deep blue
    color('#4fc3f7'), // Light blue
    color('#ffd700'), // Gold
    color('#ffffff'), // White
    color('#00695c')  // Dark teal
  ];
  
  noLoop();
}

function windowResized() {
  const headerWidth = document.getElementById("header").offsetWidth;
  resizeCanvas(headerWidth, 64);
  redraw();
}

function drawPattern(x, y, radius, layers) {
  push();
  translate(x, y);
  
  // Draw multiple layers of the pattern
  for(let layer = layers; layer > 0; layer--) {
    let currentRadius = radius * (layer/layers);
    
    // Main star pattern
    beginShape();
    for(let i = 0; i < numShapes; i++) {
      let a = angle * i;
      let r = currentRadius;
      let x1 = cos(a) * r;
      let y1 = sin(a) * r;
      vertex(x1, y1);
      
      // Create pointed star effect
      let midAngle = a + angle/2;
      let midRadius = r * 0.4;
      let x2 = cos(midAngle) * midRadius;
      let y2 = sin(midAngle) * midRadius;
      vertex(x2, y2);
    }
    endShape(CLOSE);
    
    // Decorative circles
    noFill();
    strokeWeight(1);
    stroke(colors[layer % colors.length]);
    circle(0, 0, currentRadius * 1.5);
    
    // Add geometric details
    for(let i = 0; i < numShapes; i++) {
      let a = angle * i;
      push();
      rotate(a);
      stroke(colors[(layer + 2) % colors.length]);
      line(currentRadius * 0.3, 0, currentRadius * 0.7, 0);
      pop();
    }
  }
  pop();
}

function drawLogo() {
  background(255, 255, 255, 0);
  
  // Draw patterns across the canvas
  let patternSize = height * 0.8;
  let spacing = patternSize * 1.2;
  
  for(let x = spacing/2; x < width; x += spacing) {
    drawPattern(x, height/2, patternSize/2, 3);
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
