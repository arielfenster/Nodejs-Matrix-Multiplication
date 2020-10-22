export const generateEmptyMatrix = ({ height, width }) => {
  const matrix = Array(height);
  
  for (let i = 0; i < height; i++) {
    matrix[i] = Array(width);
  }
  
  return matrix;
};

export const populateMatrix = (matrix) => {
  let MIN = 1, MAX = 10;

  const height = matrix.length;
  const width = matrix[0].length;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      matrix[i][j] = Math.floor(Math.random() * (MAX-MIN) + MIN);
    }
  }
};

export const getVisualizedMatrix = (matrix = [[]]) => {
  let output = '';
  matrix.forEach(row => output += row + '\n');

  return output;
};
