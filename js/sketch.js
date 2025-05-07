let logoCanvas;
const LOGO_SIZE = 64;

function setup() {
  // Logo canvas
  logoCanvas = createCanvas(LOGO_SIZE, LOGO_SIZE);
  logoCanvas.parent('logoContainer');
}

function draw() {
  clear();
  stroke(getComputedStyle(document.documentElement).getPropertyValue('--pico-h1-color'));
  noFill();
  strokeWeight(2);

  let time = frameCount * 0.05;
  for (let i = 0; i < 5; i++) {
    let x = LOGO_SIZE/2 + cos(time + i) * 15;
    let y = LOGO_SIZE/2 + sin(time + i) * 15;
    circle(x, y, 20);
  }
}

// Keep animation responsive
function windowResized() {
  resizeCanvas(LOGO_SIZE, LOGO_SIZE);
}

// Animation on scroll
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