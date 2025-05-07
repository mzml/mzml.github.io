
let logoCanvas;
const LOGO_SIZE = 64;
let shapes = [];
const NUM_SHAPES = 5;

function setup() {
  logoCanvas = createCanvas(LOGO_SIZE, LOGO_SIZE);
  logoCanvas.parent('logoContainer');
  
  // Initialize shapes with random properties
  for (let i = 0; i < NUM_SHAPES; i++) {
    shapes.push({
      offset: random(TWO_PI),
      speed: random(0.02, 0.08),
      radius: random(10, 25),
      orbitRadius: random(10, 20)
    });
  }
}

function draw() {
  clear();
  
  // Get theme colors
  const style = getComputedStyle(document.documentElement);
  const primaryColor = style.getPropertyValue('--pico-primary');
  const secondaryColor = style.getPropertyValue('--pico-primary-inverse');
  
  // Draw multiple shapes
  shapes.forEach((shape, i) => {
    const time = frameCount * shape.speed + shape.offset;
    const x = LOGO_SIZE/2 + cos(time) * shape.orbitRadius;
    const y = LOGO_SIZE/2 + sin(time) * shape.orbitRadius;
    
    stroke(i % 2 === 0 ? primaryColor : secondaryColor);
    strokeWeight(2);
    noFill();
    
    // Randomly choose between circle, square, or triangle
    const shapeType = (i + frameCount) % 3;
    switch(shapeType) {
      case 0:
        circle(x, y, shape.radius);
        break;
      case 1:
        rectMode(CENTER);
        square(x, y, shape.radius);
        break;
      case 2:
        polygon(x, y, shape.radius/2, 3);
        break;
    }
  });
}

function polygon(x, y, radius, npoints) {
  beginShape();
  for (let angle = 0; angle < TWO_PI; angle += TWO_PI / npoints) {
    let sx = x + cos(angle) * radius;
    let sy = y + sin(angle) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(LOGO_SIZE, LOGO_SIZE);
}

const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate__animated', 'animate__bounceIn');
    }
  });
});

elementsToAnimate.forEach(element => {
  observer.observe(element);
});
