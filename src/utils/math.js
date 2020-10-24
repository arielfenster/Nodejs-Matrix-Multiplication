import { matrix, multiply } from 'mathjs';
import csvParse from 'csv-parse'

const _generateMatrixFromFileStream = (fileStream) => {
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
}

const calculate = async (fileAStream, fileBStream) => {
  const [matrixA, matrixB] = await Promise.all([
    _generateMatrixFromFileStream(fileAStream),
    _generateMatrixFromFileStream(fileBStream)
  ]);

  return multiply(matrixA, matrixB);
}


export default {
  calculate,
};
