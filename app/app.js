// starting mode and color
let startingColor = 'hsl(0, 0%, 66%)';
let startingMode = 'classic';
let pencilMode = true;

function createCanvas() {
  // DOM elements
  const sliderEl = document.querySelector('#grid-slider');
  const canvasEl = document.querySelector('.canvas');
  const sliderElValue = sliderEl.value;
  const gridSize = sliderElValue * sliderElValue;
  // create grid
  createGrid(sliderElValue, canvasEl, gridSize);
  // Listen for user events
  // Resize canvas based on input value
  sliderEl.addEventListener('mouseup', createCanvas);
  // Set color mode
  canvasEl.addEventListener('mouseover', colorSquare);
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
  clearBtnEl.onclick = () => clearCanvas(canvasChild, defaultBg);
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

// color squares
function colorSquare(event) {
  const rainbowBg = `hsl(${randomHsl('color')}, 100%, 50%)`;
  const modernBg = `hsl(0, 0%, ${randomHsl('gray')}%)`;
  if (pencilMode) {
    switch (startingMode) {
      case 'classic':
        event.target.style.backgroundColor = `${startingColor}`;
        break;
      case 'rainbow':
        event.target.style.backgroundColor = `${rainbowBg}`;
        break;
      case 'modern':
        event.target.style.backgroundColor = `${modernBg}`;
        break;
      case 'eraser':
        event.target.style.backgroundColor = `hsl(0, 0%, 96%)`;
        break;
    }
  }
}

function randomHsl(clr) {
  if (clr == 'color') return Math.floor(Math.random() * 357);
  if (clr == 'gray') return Math.floor(Math.random() * 101);
}

function setColorMode(colorMode) {
  activeBtn(colorMode);
  startingMode = colorMode;
}

// active button 
function activeBtn(colorMode) {
  if (colorMode === 'classic') {
    classicBtnEl.classList.add('active');
  } else if (colorMode === 'rainbow') {
    rainbowBtnEl.classList.add('active');
  } else if (colorMode === 'modern') {
    modernBtnEl.classList.add('active');
  } else if (colorMode === 'eraser') {
    eraserBtnEl.classList.add('active');
  }

  if (startingMode === 'classic') {
    classicBtnEl.classList.remove('active');
  } else if (startingMode === 'rainbow') {
    rainbowBtnEl.classList.remove('active');
  } else if (startingMode === 'modern') {
    modernBtnEl.classList.remove('active');
  } else if (startingMode === 'eraser') {
    eraserBtnEl.classList.remove('active');
  }
}

// toggle pencil mode
document.querySelector('body').addEventListener('click', (e) => {
  const pencilEl = document.querySelector('.fa-pencil');
  if (
    e.target.tagName != 'BUTTON' &&
    e.target.classList[1] != 'fa-eraser' &&
    e.target.classList[1] != 'fa-trash'
  ) {
    pencilMode = !pencilMode;
    if (pencilMode) {
      pencilEl.classList.add('active');
    } else {
      pencilEl.classList.remove('active');
    }
  }
});

// Default canvas 16x16
const classicBtnEl = document.querySelector('.classic-btn');
const modernBtnEl = document.querySelector('.modern-btn');
const rainbowBtnEl = document.querySelector('.rainbow-btn');
const eraserBtnEl = document.querySelector('.eraser-btn');
classicBtnEl.onclick = () => setColorMode('classic');
modernBtnEl.onclick = () => setColorMode('modern');
rainbowBtnEl.onclick = () => setColorMode('rainbow');
eraserBtnEl.onclick = () => setColorMode('eraser');
createCanvas();