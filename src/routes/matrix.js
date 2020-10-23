import express from "express";
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import matrixUtils from '../utils/matrix';
import filesUtils from '../utils/files';
import mathUtils from '../utils/math';
import { MATRIX_CONSTS, UPLOAD_CONSTS } from '../resources/constants';

// Create a multer middleware for uploading files (create an empty one so we can create streams instead of instantaneous upload)
const upload = multer();

const router = express.Router();

/**
 * @description Generate a random matrix with given dimensions 
 */
router.post('/generate', async (req, res) => {
  // Check the sizes entered
  const { height, width } = req.body;
  
  const matrix = matrixUtils.generateMatrix({ height, width });
  
  const savedFilePath = await filesUtils.saveMatrixToFile({ fileName: MATRIX_CONSTS.RANDOM_MATRIX_FILENAME, matrix });
  
  res.status(201).sendFile(savedFilePath, (err) => {
    if (err) { res.status(500).send(err) }
  });
});


/**
 * @description Upload user's matrices
 */
router.post('/', upload.fields([
  { name: UPLOAD_CONSTS.MATRIX_A, maxCount: 1 },
  { name: UPLOAD_CONSTS.MATRIX_B, maxCount: 1 }]) ,(req, res) => {

    const { files } = req;
    filesUtils.uploadFiles(files);
    
    res.status(200).json({
      success: true,
      message: 'Uploaded files'
    });
});


/**
 * @description Calculate the product of the matrices
 */
router.get('/', (req, res) => {
  const result = calculate({
    streamFileA: 123,
    streamFileB: 213,
  });
  

  const readStream = fs.createReadStream(path.join(__dirname, `../data/${MATRIX_CONSTS.RANDOM_MATRIX_FILENAME}`), { encoding: 'utf-8' });
  readStream.on('data', (chunk) => {
    console.log(chunk.charAt(3));
    // console.log(Object.getOwnPropertyNames(chunk));
    // chunk.forEach(x => console.log(x));
    console.log('got chunkk: ', chunk.length);
  });

  res.send('done');
});

export default router;
