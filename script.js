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
    const borderWidth = 4; // Border width
    rectangles.forEach(rect => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = `${rect.x + borderWidth / 2}px`; // Adjust for shared border
        div.style.top = `${rect.y + borderWidth / 2}px`;
        div.style.width = `${rect.width - borderWidth}px`;
        div.style.height = `${rect.height - borderWidth}px`;
        div.style.backgroundColor = getRandomColor();

        // Add borders to edges only where necessary
        div.style.borderTop = rect.y === 0 ? `${borderWidth}px solid black` : 'none';
        div.style.borderLeft = rect.x === 0 ? `${borderWidth}px solid black` : 'none';
        div.style.borderRight = `${borderWidth}px solid black`;
        div.style.borderBottom = `${borderWidth}px solid black`;

        painting.appendChild(div);
    });
}

// Generate the initial art
generateArt();
