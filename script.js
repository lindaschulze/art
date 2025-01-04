const colors = ['red', 'blue', 'yellow', 'black'];
const painting = document.getElementById('painting');

function getRandomColor(includeWhite = false) {
    if (includeWhite) {
        return Math.random() > 0.6 ? 'white' : colors[Math.floor(Math.random() * colors.length)];
    }
    return colors[Math.floor(Math.random() * colors.length)];
}

function generateArt() {
    painting.innerHTML = ''; // Clear previous painting

    const canvasWidth = painting.clientWidth;
    const canvasHeight = painting.clientHeight;
    const totalArea = canvasWidth * canvasHeight;

    // Calculate the area to allocate to white and colored rectangles
    const whiteRatio = Math.random() * (0.8 - 0.6) + 0.6; // 60-80% for white
    const whiteArea = totalArea * whiteRatio;
    const coloredArea = totalArea - whiteArea;

    // Create an initial rectangle that fills the entire canvas
    const initialRectangle = {
        x: 0,
        y: 0,
        width: canvasWidth,
        height: canvasHeight,
        color: 'white',
    };

    const rectangles = [initialRectangle];
    let currentWhiteArea = totalArea; // Start with the whole canvas as white
    let currentColoredArea = 0;

    // Split rectangles until we reach the target number and area distribution
    const minRectangles = 5;
    const maxRectangles = 20;
    const targetRectangles = Math.floor(Math.random() * (maxRectangles - minRectangles + 1)) + minRectangles;

    while (rectangles.length < targetRectangles || currentColoredArea < coloredArea) {
        const rectIndex = Math.floor(Math.random() * rectangles.length);
        const rect = rectangles[rectIndex];

        if (rect.width < 50 || rect.height < 50) continue; // Avoid splitting very small rectangles

        // Randomly decide to split vertically or horizontally
        const splitVertically = Math.random() > 0.5;

        if (splitVertically && rect.width > 100) {
            const splitPoint = Math.floor(Math.random() * (rect.width - 50)) + 50;

            const rect1 = {
                x: rect.x,
                y: rect.y,
                width: splitPoint,
                height: rect.height,
                color: rect.color,
            };

            const rect2 = {
                x: rect.x + splitPoint,
                y: rect.y,
                width: rect.width - splitPoint,
                height: rect.height,
                color: rect.color,
            };

            rectangles.splice(rectIndex, 1, rect1, rect2);
        } else if (!splitVertically && rect.height > 100) {
            const splitPoint = Math.floor(Math.random() * (rect.height - 50)) + 50;

            const rect1 = {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: splitPoint,
                color: rect.color,
            };

            const rect2 = {
                x: rect.x,
                y: rect.y + splitPoint,
                width: rect.width,
                height: rect.height - splitPoint,
                color: rect.color,
            };

            rectangles.splice(rectIndex, 1, rect1, rect2);
        }

        // Adjust colors to maintain the white-to-colored ratio
        const newRect = rectangles[rectangles.length - 1]; // The most recent split
        const newArea = newRect.width * newRect.height;

        if (Math.random() > whiteRatio && currentColoredArea < coloredArea) {
            newRect.color = getRandomColor();
            currentColoredArea += newArea;
            currentWhiteArea -= newArea;
        }
    }

    // Draw rectangles
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

    // Add borders
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
