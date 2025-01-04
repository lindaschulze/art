const colors = ['red', 'blue', 'yellow', 'black', 'white'];
const painting = document.getElementById('painting');

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomSize() {
    return Math.floor(Math.random() * (painting.offsetWidth / 2)) + 50; // size between 50px and half of the painting's width
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * (painting.offsetWidth - 100)); // position within the canvas
    const y = Math.floor(Math.random() * (painting.offsetHeight - 100));
    return { x, y };
}

function createRectangle() {
    const rect = document.createElement('div');
    const size = getRandomSize();
    const position = getRandomPosition();
    const color = getRandomColor();

    rect.style.position = 'absolute';
    rect.style.width = `${size}px`;
    rect.style.height = `${size}px`;
    rect.style.left = `${position.x}px`;
    rect.style.top = `${position.y}px`;
    rect.style.backgroundColor = color;
    rect.style.border = color === 'black' ? '2px solid black' : 'none'; // optional black border for emphasis

    painting.appendChild(rect);
}

function generateArt() {
    painting.innerHTML = ''; // Clear existing rectangles
    const numRectangles = Math.floor(Math.random() * 16) + 5; // Random number of rectangles (between 5 and 20)

    for (let i = 0; i < numRectangles; i++) {
        createRectangle();
    }
}

// Initial art generation
generateArt();
