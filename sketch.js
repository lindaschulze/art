let colors;
let rectangles;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  setInterval(changeRectangles, 1800000); // Change every 30 minutes
  changeRectangles();
}

function changeRectangles() {
  colors = [
    color(random(255), random(255), random(255)),
    color(random(255), random(255), random(255)),
    color(random(255), random(255), random(255))
  ];

  while (colors[0] === colors[1] || colors[1] === colors[2] || colors[0] === colors[2]) {
    colors[1] = color(random(255), random(255), random(255));
    colors[2] = color(random(255), random(255), random(255));
  }

  rectangles = [
    random(0.2, 0.5),
    random(0.2, 0.5),
    1.0
  ];
  redraw();
}

function draw() {
  background(255);
  let y = 0;
  for (let i = 0; i < 3; i++) {
    fill(colors[i]);
    rect(0, y, width, height * rectangles[i]);
    y += height * rectangles[i];
  }
}