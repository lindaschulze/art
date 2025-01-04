const artContainer = document.getElementById('art');

// Colors inspired by Mondrian's palette
const colors = ['#f4f4f4', '#ff0000', '#0000ff', '#ffff00', '#000000'];

function generateMondrianArt() {
  artContainer.innerHTML = ''; // Clear previous art
  artContainer.style.gridTemplateRows = '';
  artContainer.style.gridTemplateColumns = '';

  const rows = Math.floor(Math.random() * 4) + 3; // 3-6 rows
  const cols = Math.floor(Math.random() * 4) + 3; // 3-6 columns

  artContainer.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  artContainer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let i = 0; i < rows * cols; i++) {
    const div = document.createElement('div');
    div.style.border = '2px solid black';
    div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    artContainer.appendChild(div);
  }
}

// Regenerate the art every 3 seconds
generateMondrianArt();
setInterval(generateMondrianArt, 3000);
