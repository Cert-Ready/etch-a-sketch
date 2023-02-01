// DOM elements
const canvasEl = document.querySelector('.canvas');
const sliderEl = document.querySelector('#grid-slider');
const gridSizeEl = document.querySelectorAll('.grid-size');
const squareCount = document.querySelector('.square-count');

// slider value
const sliderElValue = sliderEl.value;
const gridSize = sliderElValue * sliderElValue;

// style canvas
canvasEl.style.cssText = `
    grid-template-columns: repeat(${sliderElValue}, 1fr);
    grid-template-rows: repeat(${sliderElValue}, 1fr);
`;

// create grid
for (let i = 0; i < gridSize; i++) {
  let canvasSquare = document.createElement('div');
  canvasSquare.style.cssText = `
  background-color:  rgb(245,245,245);
  outline: 1px solid var(--dark-0); 
  `;
  canvasEl.appendChild(canvasSquare);
}

// QOL display grid size on DOM
gridSizeEl.forEach((element) => {
  element.textContent = sliderElValue;
});

squareCount.textContent = gridSize;

console.log('slider value = ' + sliderElValue);
console.log(typeof gridSize);
console.log(gridSize);