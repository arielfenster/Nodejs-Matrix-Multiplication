import { matrix, multiply } from 'mathjs';

const calculate = ({ fileAStream, fileBStream }) => {
  
  let i=1;
  fileAStream.on('data', (chunk) => {
    // console.log(`got chunk #${i}`);
    // i++;
  });
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
  const sm1 = matrix([
    [1],[2],[3]
  ]);
  const sm2 = matrix([1,2,3]);
  console.log(sm1.size(), sm2.size());
  console.log(multiply(sm1,sm2).valueOf());
  return multiply(mat1, mat2).valueOf();
};


export default {
  calculate,
};
