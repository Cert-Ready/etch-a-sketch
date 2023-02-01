function createCanvas() {
  // DOM elements
  const sliderEl = document.querySelector('#grid-slider');
  const canvasEl = document.querySelector('.canvas');
  const sliderElValue = sliderEl.value;
  const gridSize = sliderElValue * sliderElValue;
  // create grid
  createGrid(sliderElValue, canvasEl, gridSize);
  // Listen for user events
  sliderEl.addEventListener('mouseup', createCanvas); // Resize canvas
  canvasEl.addEventListener('mousemove', colorMode); // Set colors
  // QOL display grid-size and square count on DOM
  updateDom(sliderElValue, gridSize);
}

function createGrid(sliderValue, canvas, gridSize) {
  const clearBtnEl = document.querySelector('.clear-btn');
  const defaultBg = 'hsl(0, 0%, 96%)';
  canvas.style.cssText = `
    grid-template-columns: repeat(${sliderValue}, 1fr);
    grid-template-rows: repeat(${sliderValue}, 1fr);
    `;
  for (let i = 0; i < gridSize; i++) {
    let canvasSquare = document.createElement('div');
    canvasSquare.style.cssText = `
        background-color:  ${defaultBg};
        outline: 1px solid var(--dark-0); 
        `;
    canvas.appendChild(canvasSquare);
  }
  // clear canvas
  let canvasChild = canvas.childNodes;
  clearBtnEl.addEventListener('click', () => clearCanvas(canvasChild, defaultBg));
}

// clear canvas
const clearCanvas = (element, defaultBg) => {
  element.forEach((node) => {
    node.style.backgroundColor = defaultBg;
  });
};

function updateDom(sliderValue, gridSize) {
  // DOM elements to display grid size and square count
  const gridSizeEl = document.querySelectorAll('.grid-size');
  const squareCount = document.querySelector('.square-count');
  // QOL display grid size on DOM
  gridSizeEl.forEach((element) => {
    element.textContent = sliderValue;
  });
  // QOL display square count on DOM
  squareCount.textContent = gridSize;
}

const colorMode = (event) => {
  const classicBg = 'hsl(0, 0%, 66%)';
  const rainbowBg = 'hsl(194, 100%, 50%)';
  return (event.target.style.backgroundColor = `${classicBg}`);
};

// Default canvas 16x16
createCanvas();