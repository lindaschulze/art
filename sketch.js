let colors;
let rectangles;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the screen
  noLoop(); // No continuous drawing
  setInterval(changeRectangles, 600000); // Change rectangles every 10 minutes
  changeRectangles(); // Initial setup of rectangles
}

function changeRectangles() {
  // Piet Mondrian's iconic colors
  colors = [
    color(255, 0, 0), // Red
    color(255, 255, 0), // Yellow
    color(0, 0, 255), // Blue
    color(255, 255, 255), // White
    color(0, 0, 0) // Black for outlines
  ];

  rectangles = [];

  // Number of rectangles (between 4 and 10)
  let numRects = int(random(4, 10));

  for (let i = 0; i < numRects; i++) {
    let rectColor = colors[int(random(4))]; // Random color (excluding black)
    let w = random(width * 0.2, width * 0.6); // Random width
    let h = random(height * 0.2, height * 0.6); // Random height
    let x = random(0, width - w); // Random x-position
    let y = random(0, height - h); // Random y-position

    rectangles.push({ x, y, w, h, rectColor }); // Store rectangle data
  }

  redraw(); // Trigger the draw function
}

function draw() {
  background(255); // White background

  for (let rect of rectangles) {
    fill(rect.rectColor); // Fill with rectangle color
    stroke(0); // Black outlines
    strokeWeight(5); // Thick black lines
    rect(rect.x, rect.y, rect.w, rect.h); // Draw rectangle
  }
}
