
let logoCanvas;
const LOGO_SIZE = 64;

function setup() {
  // Main canvas
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  // Logo canvas
  let logoContainer = document.querySelector('nav ul li');
  if (logoContainer) {
    logoCanvas = createGraphics(LOGO_SIZE, LOGO_SIZE);
    let logoElement = document.createElement('div');
    logoElement.id = 'logoCanvas';
    logoElement.style.width = LOGO_SIZE + 'px';
    logoElement.style.height = LOGO_SIZE + 'px';
    logoContainer.appendChild(logoElement);
    logoCanvas.parent(logoElement);
  }
}

function draw() {
  // Background canvas stays empty
  clear();
  
  // Logo animation
  if (logoCanvas) {
    logoCanvas.clear();
    logoCanvas.stroke(getComputedStyle(document.documentElement).getPropertyValue('--pico-h1-color'));
    logoCanvas.noFill();
    logoCanvas.strokeWeight(2);
    
    let time = frameCount * 0.05;
    for (let i = 0; i < 5; i++) {
      let x = LOGO_SIZE/2 + cos(time + i) * 15;
      let y = LOGO_SIZE/2 + sin(time + i) * 15;
      logoCanvas.circle(x, y, 20);
    }
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
