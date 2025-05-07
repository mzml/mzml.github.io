
let logoCanvas;
const LOGO_SIZE = 64;

function setup() {
  // Main canvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  // Logo canvas
  let logoContainer = document.querySelector('nav svg');
  if (logoContainer) {
    logoContainer.remove();
    let logoElement = document.createElement('canvas');
    logoElement.id = 'logoCanvas';
    document.querySelector('nav ul li').appendChild(logoElement);
    logoCanvas = createGraphics(LOGO_SIZE, LOGO_SIZE, logoElement);
  }
}

function draw() {
  // Logo animation
  logoCanvas.background(255, 0);
  logoCanvas.stroke(getComputedStyle(document.documentElement).getPropertyValue('--pico-h1-color'));
  logoCanvas.noFill();
  logoCanvas.strokeWeight(2);
  
  let time = frameCount * 0.05;
  for (let i = 0; i < 5; i++) {
    let x = LOGO_SIZE/2 + cos(time + i) * 20;
    let y = LOGO_SIZE/2 + sin(time + i) * 20;
    logoCanvas.circle(x, y, 30);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
