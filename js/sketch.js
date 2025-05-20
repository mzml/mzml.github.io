
let letters = ['m', 'z', 'm', 'l'];
let letterPositions = [];
let colors = [];

function setup() {
  let canvas = createCanvas(64, 64);
  canvas.id("logo-canvas");    
  canvas.parent("logo-container");
  textSize(16);
  textAlign(CENTER, CENTER);
  
  // Initialize letter positions and colors
  for(let i = 0; i < letters.length; i++) {
    letterPositions.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1)
    });
    colors.push({
      r: random(255),
      g: random(255),
      b: random(255)
    });
  }
}

function draw() {
  background(255, 255, 255, 0);
  
  for(let i = 0; i < letters.length; i++) {
    // Update position
    letterPositions[i].x += letterPositions[i].vx;
    letterPositions[i].y += letterPositions[i].vy;
    
    // Bounce off edges
    if(letterPositions[i].x > width || letterPositions[i].x < 0) letterPositions[i].vx *= -1;
    if(letterPositions[i].y > height || letterPositions[i].y < 0) letterPositions[i].vy *= -1;
    
    // Draw letter
    fill(colors[i].r, colors[i].g, colors[i].b);
    text(letters[i], letterPositions[i].x, letterPositions[i].y);
  }
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
