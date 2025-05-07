function setup() {
  let canvas = createCanvas(64, 64);
  canvas.id("logo-canvas");    
  background(255, 255, 255, 0);
  canvas.parent("logo-container");
  drawLogo();
  noLoop();
}

function drawLogo() {
strokeWeight(2);
  for (let i = 0; i < 50; i++) {
      stroke(random(255), random(255), random(255));
      strokeWeight(random(1, 3));
      line(random(width), random(height), random(width), random(height));
  }
}

function windowResized() {
//resizeCanvas(windowWidth, windowHeight)
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


