const colors = ['red', 'blue', 'yellow', 'black'];
const painting = document.getElementById('painting');

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateArt() {
    painting.innerHTML = ''; // Clear previous painting

    const canvasWidth = painting.clientWidth;
    const canvasHeight = painting.clientHeight;
    const totalArea = canvasWidth * canvasHeight;

    // Create an initial rectangle that fills the entire canvas
    const initialRectangle = {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
    };

    // Array to hold rectangles
    const rectangles = [initialRectangle];

    // Split rectangles until we have a sufficient number (5-20 rectangles)
    const minRectangles = 5;
    const maxRectangles = 20;
    const targetRectangles = Math.floor(Math.random() * (maxRectangles - minRectangles + 1)) + minRectangles;

    while (rectangles.length < targetRectangles && rectangles.length < 20) {
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

    // Calculate the total area of white space (60-80% of the total area)
    const whiteAreaMin = totalArea * 0.6;
    const whiteAreaMax = totalArea * 0.8;
    let whiteAreaCovered = 0;

    // Draw the rectangles
    rectangles.forEach(rect => {
        // Randomly decide whether to make this rectangle white or a colored one
        const isWhite = Math.random() < 0.5 && whiteAreaCovered < whiteAreaMax;

        if (isWhite) {
            // If it's white, increase the white area covered
            whiteAreaCovered += rect.width * rect.height;
            if (whiteAreaCovered > whiteAreaMax) {
                // If white area exceeds the maximum, switch remaining rectangles to colored
                whiteAreaCovered = whiteAreaMax;
            }
        }

        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = `${rect.x + 2}px`;  // Adjusted for border gap
        div.style.top = `${rect.y + 2}px`;  // Adjusted for border gap
        div.style.width = `${rect.width - 4}px`;  // Adjusted for border gap
        div.style.height = `${rect.height - 4}px`;  // Adjusted for border gap
        div.style.backgroundColor = isWhite ? 'white' : getRandomColor(); // Assign color or white

        painting.appendChild(div);
    });

    // Draw the borders
    const lineThickness = 4; // Border thickness
    rectangles.forEach(rect => {
        // Only draw borders where necessary (not on the outermost edges)
        // Vertical line (right edge)
        if (rect.x + rect.width < canvasWidth) {
            const verticalLine = document.createElement('div');
            verticalLine.style.position = 'absolute';
            verticalLine.style.left = `${rect.x + rect.width - 2}px`;  // Adjusted to align with color
            verticalLine.style.top = `${rect.y}px`;
            verticalLine.style.width = `${lineThickness}px`;
            verticalLine.style.height = `${rect.height}px`;
            verticalLine.style.backgroundColor = 'black';
            painting.appendChild(verticalLine);
        }

        // Horizontal line (bottom edge)
        if (rect.y + rect.height < canvasHeight) {
            const horizontalLine = document.createElement('div');
            horizontalLine.style.position = 'absolute';
            horizontalLine.style.left = `${rect.x}px`;
            horizontalLine.style.top = `${rect.y + rect.height - 2}px`;  // Adjusted to align with color
            horizontalLine.style.width = `${rect.width}px`;
            horizontalLine.style.height = `${lineThickness}px`;
            horizontalLine.style.backgroundColor = 'black';
            painting.appendChild(horizontalLine);
        }
    });

    // Draw outermost border around the entire canvas
    const outerBorderThickness = 4; // Border thickness for outer edge
    const outerBorder = document.createElement('div');
    outerBorder.style.position = 'absolute';
    outerBorder.style.left = '0px';
    outerBorder.style.top = '0px';
    outerBorder.style.width = `${canvasWidth}px`;
    outerBorder.style.height = `${canvasHeight}px`;
    outerBorder.style.border = `${outerBorderThickness}px solid black`;
    painting.appendChild(outerBorder);
}

// Generate the initial art
generateArt();
