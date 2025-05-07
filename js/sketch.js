
const LOGO_SIZE = 64;

function setup() {
  const logoCanvas = createCanvas(LOGO_SIZE, LOGO_SIZE);
  logoCanvas.parent('logoContainer');
  
  // Get theme colors
  const style = getComputedStyle(document.documentElement);
  const primaryColor = style.getPropertyValue('--pico-primary');
  const secondaryColor = style.getPropertyValue('--pico-primary-inverse');
  
  // Clear background
  clear();
  
  // Generate random testing/automation symbol
  const symbols = [
    drawTestCase,
    drawFlowDiagram,
    drawCircuitBoard,
    drawGears
  ];
  
  // Pick random symbol and draw it
  const randomSymbol = random(symbols);
  randomSymbol(primaryColor, secondaryColor);
  
  // Stop draw loop since we only need to generate once
  noLoop();
}

function drawTestCase(primary, secondary) {
  const checkSize = random(20, 30);
  translate(LOGO_SIZE/2, LOGO_SIZE/2);
  rotate(random(TWO_PI));
  
  stroke(primary);
  noFill();
  strokeWeight(2);
  rect(-checkSize/2, -checkSize/2, checkSize, checkSize);
  
  stroke(secondary);
  line(-checkSize/4, 0, -checkSize/8, checkSize/4);
  line(-checkSize/8, checkSize/4, checkSize/4, -checkSize/4);
}

function drawFlowDiagram(primary, secondary) {
  const nodes = 3;
  const radius = 15;
  
  stroke(primary);
  strokeWeight(2);
  noFill();
  
  for(let i = 0; i < nodes; i++) {
    const angle = (TWO_PI / nodes) * i;
    const x = LOGO_SIZE/2 + cos(angle) * radius;
    const y = LOGO_SIZE/2 + sin(angle) * radius;
    circle(x, y, radius);
    
    stroke(secondary);
    line(x, y, LOGO_SIZE/2, LOGO_SIZE/2);
    stroke(primary);
  }
}

function drawCircuitBoard(primary, secondary) {
  const gridSize = 4;
  const cellSize = LOGO_SIZE / gridSize;
  
  stroke(primary);
  strokeWeight(2);
  
  for(let i = 0; i < random(3, 6); i++) {
    const x1 = floor(random(gridSize)) * cellSize;
    const y1 = floor(random(gridSize)) * cellSize;
    const x2 = floor(random(gridSize)) * cellSize;
    const y2 = floor(random(gridSize)) * cellSize;
    
    stroke(i % 2 === 0 ? primary : secondary);
    line(x1, y1, x2, y2);
    circle(x1, y1, 5);
    circle(x2, y2, 5);
  }
}

function drawGears(primary, secondary) {
  const teeth = floor(random(6, 12));
  const outerRadius = 25;
  const innerRadius = 15;
  
  translate(LOGO_SIZE/2, LOGO_SIZE/2);
  rotate(random(TWO_PI));
  
  stroke(primary);
  strokeWeight(2);
  noFill();
  
  beginShape();
  for(let i = 0; i < teeth * 2; i++) {
    const angle = (TWO_PI / (teeth * 2)) * i;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const x = cos(angle) * radius;
    const y = sin(angle) * radius;
    vertex(x, y);
  }
  endShape(CLOSE);
  
  stroke(secondary);
  circle(0, 0, innerRadius);
}

// These are needed for P5.js to work
function draw() {}
function windowResized() {}
