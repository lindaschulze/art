let colors;
let rectangles;

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  noLoop();
  setInterval(changeRectangles, 600000); // Change every 10 minutes
  changeRectangles();
}

function changeRectangles() {
  // Mondrian-inspired colors
  colors = [
    color(255, 0, 0), // Red
    color(255, 255, 0), // Yellow
    color(0, 0, 255), // Blue
    color(255, 255, 255), // White
    color(0, 0, 0) // Black for outlines
  ];

  rectangles = [];
  
  // Create random rectangles
  let numRects = int(random(4, 10)); // Number of rectangles
  for (let i = 0; i < numRects; i++) {
    let rectColor = colors[int(random(4))]; // Random color from the palette
    let w = random(width * 0.2, width * 0.6); // Random width
    let h = random(height * 0.2, height * 0.6); // Random height
    let x = random(0, width - w);
    let y = random(0, height - h);
    rectangles.push({ x, y, w, h, rectColor });
  }
  redraw();
}

function draw() {
  background(255); // White background
  for (let rect of rectangles) {
    fill(rect.rectColor); // Fill with rectangle color
    stroke(0); // Black outlines
    strokeWeight(5); // Thick lines for Mondrian style
    rect(rect.x, rect.y, rect.w, rect.h); // Draw rectangle
  }
}
