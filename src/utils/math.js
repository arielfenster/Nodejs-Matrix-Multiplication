import { matrix, multiply } from 'mathjs';
import csvParse from 'csv-parse'

const createPromiseOfStream = (fileStream) => {
  const stream = fileStream.pipe(csvParse({
    skipEmptyLines: true,
    cast: (x) => parseInt(x),
  }));
  
  return new Promise((resolve, reject) => {
    const data = [];

    stream.on('data', (row) => data.push(row));
    stream.on('end', () => resolve(matrix(data)));
    stream.on('error', (error) => reject(error));
  });
};

const calculate = async ({ fileAStream, fileBStream }) => {
  const [matrixA, matrixB] = await Promise.all([
    createPromiseOfStream(fileAStream),
    createPromiseOfStream(fileBStream)
  ]);

  try {
    return multiply(matrixA, matrixB);
  } catch (error) {
    console.error('Error in calculating the product: ', error.message);
    return null;
  }
};


export default {
  calculate,
};
