const colors = ['red', 'blue', 'yellow', 'black'];
const painting = document.getElementById('painting');

function getRandomColor(isWhiteAllowed = false) {
    if (isWhiteAllowed && Math.random() < 0.7) return 'white'; // Higher chance for white to satisfy ratio
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateArt() {
    painting.innerHTML = ''; // Clear previous painting

    const canvasWidth = painting.clientWidth;
    const canvasHeight = painting.clientHeight;
    const totalArea = canvasWidth * canvasHeight;

    // Define the white-to-color ratio (60-80% white)
    const whiteRatio = Math.random() * (0.8 - 0.6) + 0.6;
    const targetWhiteArea = totalArea * whiteRatio;
    const targetColoredArea = totalArea - targetWhiteArea;

    let currentWhiteArea = 0;
    let currentColoredArea = 0;

    // Create an initial rectangle that fills the canvas
    const initialRectangle = {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
    };

    const rectangles = [initialRectangle];

    // Split rectangles into smaller rectangles
    const minRectangles = 5;
    const maxRectangles = 20;
    const targetRectangles = Math.floor(Math.random() * (maxRectangles - minRectangles + 1)) + minRectangles;

    while (rectangles.length < targetRectangles) {
        const rectIndex = Math.floor(Math.random() * rectangles.length);
        const rect = rectangles[rectIndex];

        if (rect.width < 50 || rect.height < 50) continue; // Avoid splitting very small rectangles

        const splitVertically = Math.random() > 0.5;

        if (splitVertically && rect.width > 100) {
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

    // Assign colors to rectangles while maintaining the white-to-colored ratio
    rectangles.forEach(rect => {
        const rectArea = rect.width * rect.height;
        const useWhite =
            currentWhiteArea < targetWhiteArea &&
            (currentColoredArea >= targetColoredArea || Math.random() < whiteRatio);

        if (useWhite) {
            rect.color = 'white';
            currentWhiteArea += rectArea;
        } else {
            rect.color = getRandomColor();
            currentColoredArea += rectArea;
        }
    });

    // Draw rectangles with borders
    const lineThickness = 4; // Border thickness
    rectangles.forEach(rect => {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = `${rect.x}px`;
        div.style.top = `${rect.y}px`;
        div.style.width = `${rect.width - lineThickness}px`;
        div.style.height = `${rect.height - lineThickness}px`;
        div.style.backgroundColor = rect.color;

        painting.appendChild(div);
    });

    // Draw black borders separately for each rectangle
    rectangles.forEach(rect => {
        // Vertical line (right edge)
        if (rect.x + rect.width < canvasWidth) {
            const verticalLine = document.createElement('div');
            verticalLine.style.position = 'absolute';
            verticalLine.style.left = `${rect.x + rect.width}px`;
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
            horizontalLine.style.top = `${rect.y + rect.height}px`;
            horizontalLine.style.width = `${rect.width}px`;
            horizontalLine.style.height = `${lineThickness}px`;
            horizontalLine.style.backgroundColor = 'black';
            painting.appendChild(horizontalLine);
        }
    });
}

// Generate the initial art
generateArt();
