
// Creates an empty 2D array
const createEmptyMatrix = (height, width) => {

  const matrix = Array(height);
  
  for (let i = 0; i < height; i++) {
    matrix[i] = Array(width);
  }
  
  return matrix;
};

const generateMatrix = ({ height, width }) => {
  const MIN = 1, MAX = 10;

  const matrix = createEmptyMatrix(height, width);

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      matrix[i][j] = Math.floor(Math.random() * (MAX-MIN) + MIN);
    }
  }
  return matrix;
};

// Gets a string representation of the matrix to display it in rows
const parseMatrix = (matrix) => {
  let output = '';
  
  matrix.forEach(row => {
    output += row.join(', ') + '\n';
  });

  return output;
};

export default {
  generateMatrix,
  parseMatrix,
};
