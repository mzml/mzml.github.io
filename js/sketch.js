
let t = 0;
let colors;
let initialOffsets = [];
let amplitudes = [];

function setup() {
    const headerWidth = document.getElementById("header").offsetWidth;
    let canvas = createCanvas(headerWidth, 64);
    canvas.id("logo-canvas");
    background(255, 255, 255, 0);
    canvas.parent("logo-container");
    
    // Create complementary color palette with slight random variations
    const baseColor = color('#d24317');
    colors = [
        color(red(baseColor) + random(-20, 20), green(baseColor) + random(-20, 20), blue(baseColor) + random(-20, 20)),
        color('#17d243'),
        color('#d21769'),
        color('#d29217')
    ];
    
    // Random initial conditions
    for(let i = 0; i < 4; i++) {
        initialOffsets.push(random(TWO_PI));
        amplitudes.push(random(15, 25));
    }
    
    loop();
}

function windowResized() {
    const headerWidth = document.getElementById("header").offsetWidth;
    resizeCanvas(headerWidth, 64);
}

function drawLogo() {
    clear();
    noFill();
    
    for(let i = 0; i < 4; i++) {
        stroke(colors[i]);
        strokeWeight(2);
        
        beginShape();
        vertex(0, height/2);
        
        let offset = (t + initialOffsets[i]) % TWO_PI;
        let cx1 = width * 0.33;
        let cy1 = height/2 + sin(offset) * amplitudes[i];
        let cx2 = width * 0.66;
        let cy2 = height/2 + sin(offset + PI) * amplitudes[i];
        
        bezierVertex(cx1, cy1, cx2, cy2, width, height/2);
        endShape();
    }
    
    t += 0.02;
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
