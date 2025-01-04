const colors = ['red', 'blue', 'yellow', 'black', 'white'];
const painting = document.getElementById('painting');

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateArt() {
    painting.innerHTML = ''; // Clear previous rectangles

    const canvasWidth = painting.clientWidth;
    const canvasHeight = painting.clientHeight;

    // Create an initial rectangle that fills the entire canvas
    const initialRectangle = {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
    };

    // Array to hold rectangles
    const rectangles = [initialRectangle];

    // Split rectangles until we have a sufficient number
    const minRectangles = 5;
    const maxRectangles = 20;
    const targetRectangles = Math.floor(Math.random() * (maxRectangles - minRectangles + 1)) + minRectangles;

    while (rectangles.length < targetRectangles) {
        // Choose a rectangle to split
        const rectIndex = Math.floor(Math.random() * rectangles.length);
        const rect = rectangles[rectIndex];

        // Randomly decide whether to split vertically or horizontally
        const splitVertically = Math.random() > 0.5;

        if (splitVertically && rect.width > 100) {
            // Split vertically
            const splitPoint = Math.floor(Math.random() * (rect.width - 50)) + 50;

            const rect1 = {
                x: rect.x,
                y: rect.y,
                width: splitPoint,
                height: rect.height,
            };

            const rect2 = {
                x: rect.x + splitPoint,
                y: rect.y,
                width: rect.width - splitPoint,
                height: rect.height,
            };

            rectangles.splice(rectIndex, 1, rect1, rect2);
        } else if (!splitVertically && rect.height > 100) {
            // Split horizontally
            const splitPoint = Math.floor(Math.random() * (rect.height - 50)) + 50;

            const rect1 = {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: splitPoint,
            };

            const rect2 = {
                x: rect.x,
                y: rect.y + splitPoint,
                width: rect.width,
                height: rect.height - splitPoint,
            };

            rectangles.splice(rectIndex, 1, rect1, rect2);
        }
    }

    // Create DOM elements for each rectangle
    rectangles.forEach(rect => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = `${rect.x}px`;
        div.style.top = `${rect.y}px`;
        div.style.width = `${rect.width - 4}px`; // Adjust for border width
        div.style.height = `${rect.height - 4}px`; // Adjust for border width
        div.style.backgroundColor = getRandomColor();
        div.style.border = '4px solid black';

        painting.appendChild(div);
    });
}

// Generate the initial art
generateArt();
