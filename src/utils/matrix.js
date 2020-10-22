import fs from 'fs';
import path from 'path';

const generateEmptyMatrix = ({ height, width }) => {
  const matrix = Array(height);
  
  for (let i = 0; i < height; i++) {
    matrix[i] = Array(width);
  }
  
  return matrix;
};

const populateMatrix = (matrix) => {
  const height = matrix.length;
  const width = matrix[0].length;
  
  const MIN = 1, MAX = 10;

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      matrix[i][j] = Math.floor(Math.random() * (MAX-MIN) + MIN);
    }
  }
  
  return matrix;
};

export const generateMatrix = ({ height, width }) => {
  const matrix = generateEmptyMatrix({ height, width });
  return populateMatrix(matrix);
};

const parseMatrix = (matrix = [[]]) => {
  let output = '';
  
  matrix.forEach(row => {
    output += row.join(', ') + '\n';
  });

  return output;
};

export const saveMatrixToFile = (fileName, matrix) => {
  if (!fileName.endsWith('.txt')) {
    fileName += '.txt';
  }
  const matrixString = parseMatrix(matrix);
  
  const filePath = path.join(__dirname, '../data', `/${fileName}`);

  try {
    fs.writeFileSync(filePath, matrixString, { encoding: 'utf-8' });
    console.log('File saved');
  } catch (error) {
    console.error('Failed to save the file: ', err);
  }
};
