import fs from 'fs';
import path from 'path';
import streamifier from 'streamifier';
import { createArrayCsvWriter } from 'csv-writer';

const _checkFilenameSuffix = (fileName) => {
  // Check for the file name's suffix and modify it if necessary
  if (!fileName.endsWith('.csv')) {
    fileName += '.csv';
  } else if (fileName.endsWith('.txt')) {
    fileName = fileName.replace('.txt', '.csv');
  }

  return fileName;
}

const saveMatrixToFile = async ({ fileName, matrix }) => {
  fileName = _checkFilenameSuffix(fileName);
  
  const filePath = path.join(__dirname, '../data', `/${fileName}`);
  
  const csvWriter = createArrayCsvWriter({ path: filePath });
  
  // Save the file and return the path that it was saved to
    await csvWriter.writeRecords(matrix);
    return filePath;
};

const uploadMatricesFiles = (files) => {
  for (const fileKey in files) {
    const file = files[fileKey][0];
    const { buffer } = file;

    const writeStream = fs.createWriteStream(path.join(__dirname, `../data/${fileKey}.csv`));
    streamifier.createReadStream(buffer).pipe(writeStream);
  }
};

const getMatrixFilePath = (name) => {
  name = _checkFilenameSuffix(name);
  return path.join(__dirname, '../data', `/${name}`);
}


export default {
  saveMatrixToFile,
  uploadMatricesFiles,
  getMatrixFilePath
};
