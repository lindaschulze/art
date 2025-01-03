let colors;
let rectangles;

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fills the screen
  noLoop(); // Disable continuous drawing
  changeRectangles(); // Generate initial rectangles
  setInterval(changeRectangles, 600000); // Update rectangles every 10 minutes
}

function changeRectangles() {
  // Define Piet Mondrian's color palette
  colors = [
    color(255, 0, 0), // Red
    color(255, 255, 0), // Yellow
    color(0, 0, 255), // Blue
    color(255, 255, 255), // White
    color(0, 0, 0) // Black
  ];

  rectangles = [];

  // Generate random rectangles
  let numRects = int(random(4, 10)); // Random number of rectangles
  for (let i = 0; i < numRects; i++) {
    let rectColor = colors[int(random(4))]; // Pick a random color
    let w = random(width * 0.2, width * 0.6); // Random width
    let h = random(height * 0.2, height * 0.6); // Random height
    let x = random(0, width - w); // Random x-coordinate
    let y = random(0, height - h); // Random y-coordinate

    rectangles.push({ x, y, w, h, rectColor }); // Store rectangle data
  }

  redraw(); // Trigger draw function
}

function draw() {
  background(255); // White background

  for (let rect of rectangles) {
    fill(rect.rectColor); // Set fill color
    stroke(0); // Black outlines
    strokeWeight(5); // Thick outline
    rect(rect.x, rect.y, rect.w, rect.h); // Draw rectangle
  }
}
