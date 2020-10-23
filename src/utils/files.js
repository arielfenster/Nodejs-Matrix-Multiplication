import fs from 'fs';
import path from 'path';
import streamifier from 'streamifier';
import { createArrayCsvWriter } from 'csv-writer';

const checkFilenameSuffix = (fileName) => {
  // Check for the file name's suffix and modify it if necessary
  if (!fileName.endsWith('.csv')) {
    fileName += '.csv';
  } else if (fileName.endsWith('.txt')) {
    fileName = fileName.replace('.txt', '.csv');
  }

  return fileName;
}

const saveMatrixToFile = async ({ fileName, matrix }) => {
  fileName = checkFilenameSuffix(fileName);
  
  const filePath = path.join(__dirname, '../data', `/${fileName}`);

  const csvWriter = createArrayCsvWriter({ path: filePath });
  // Save the file and return the path that it was saved to
  try {
    await csvWriter.writeRecords(matrix);
    console.log('File saved');
    return filePath;
  } catch (error) {
    console.error('Failed to save the file: ', error);
  }
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
  name = checkFilenameSuffix(name);
  return path.join(__dirname, '../data', `/${name}`);
}


export default {
  saveMatrixToFile,
  uploadMatricesFiles,
  getMatrixFilePath
};
