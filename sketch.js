const artContainer = document.getElementById("art");

// Mondrian's color palette
const colors = ["#ff0000", "#0000ff", "#ffff00", "#f4f4f4", "#000000"];

/**
 * Generates a random number within a range
 */
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a new Mondrian painting
 */
function generateMondrianArt() {
  artContainer.innerHTML = ""; // Clear the canvas

  const rectangleCount = randomRange(5, 20); // Random number of rectangles
  const rectangles = [];

  for (let i = 0; i < rectangleCount; i++) {
    const width = randomRange(10, 50); // Rectangle width (in percentage of container)
    const height = randomRange(10, 50); // Rectangle height (in percentage of container)
    const x = randomRange(0, 100 - width); // X position
    const y = randomRange(0, 100 - height); // Y position
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Ensure no overlapping rectangles
    const overlapping = rectangles.some(rect => {
      return (
        x < rect.x + rect.width &&
        x + width > rect.x &&
        y < rect.y + rect.height &&
        y + height > rect.y
      );
    });
    if (overlapping) continue;

    rectangles.push({ x, y, width, height });

    // Create the rectangle
    const div = document.createElement("div");
    div.className = "rectangle";
    div.style.width = `${width}%`;
    div.style.height = `${height}%`;
    div.style.left = `${x}%`;
    div.style.top = `${y}%`;
    div.style.backgroundColor = color;

    artContainer.appendChild(div);
  }
}

// Generate the initial art and refresh every 5 seconds
generateMondrianArt();
setInterval(generateMondrianArt, 5000);
