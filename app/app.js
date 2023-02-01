// DOM elements
const canvasEl = document.querySelector('.canvas');
const sliderEl = document.querySelector('#grid-slider');
const gridSizeEl = document.querySelectorAll('.grid-size');
const squareCount = document.querySelector('.square-count');
const clearBtnEl = document.querySelector('.clear-btn');

// slider value
const sliderElValue = sliderEl.value;
const gridSize = sliderElValue * sliderElValue;

// style canvas
canvasEl.style.cssText = `
    grid-template-columns: repeat(${sliderElValue}, 1fr);
    grid-template-rows: repeat(${sliderElValue}, 1fr);
`;

const defaultBackground = 'rgb(245,245,245)';
const classicBg = 'rgb(169,169,169)';

const classicColor = (event) => {
  return (event.target.style.backgroundColor = `${classicBg}`);
};

// create grid
for (let i = 0; i < gridSize; i++) {
  let canvasSquare = document.createElement('div');
  canvasSquare.style.cssText = `
  background-color:  ${defaultBackground};
  outline: 1px solid var(--dark-0); 
  `;
  canvasEl.appendChild(canvasSquare);
}

clearBtnEl.addEventListener('click', () => clearCanvas(canvasEl.childNodes));
canvasEl.addEventListener('mouseover', classicColor);

// clear canvas
const clearCanvas = (element) => {
  // console.log(element);
  element.forEach((node) => {
    // console.log(node);
    node.style.backgroundColor = defaultBackground;
  });
};

// QOL display grid size on DOM
gridSizeEl.forEach((element) => {
  element.textContent = sliderElValue;
});

squareCount.textContent = gridSize;