function setup() {
    let canvas = createCanvas(windowWidth, windowHeight)
    canvas.position(0, 0)
    canvas.style('z-index', '-1')
}

function draw() {
    // background(255);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
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