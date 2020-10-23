import { matrix, multiply } from 'mathjs';
import { saveMatrixToFile } from './matrix';


export const calculate = ({ streamFileA, streamFileB }) => {
  
};

const mat1 = matrix([
  [1,2,3],
  [1,2,3],
  [1,2,3],
  [1,2,3],
  [1,2,3]
]);
const mat2 = matrix([
  [1,2,3,4],
  [1,2,3,4],
  [1,2,3,4],
]);

const res = multiply(mat1,mat2);

export default {
  calculate,
};
