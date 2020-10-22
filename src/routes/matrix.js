import express from "express";
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import streamifier from 'streamifier';
import { generateMatrix, saveMatrixToFile } from '../utils/matrix';
import { MATRIX_CONSTS, UPLOAD_CONSTS } from '../utils/constants';

// Create a multer middleware for uploading files (create an empty one so we can create streams instead of instantaneous upload)
const upload = multer();

const router = express.Router();

/**
 * @description Generate a random matrix with given dimensions 
 */
router.post('/generate', (req, res) => {
  // Check the sizes entered
  const { height, width } = req.body;
  
  const matrix = generateMatrix({ height, width });
  
  saveMatrixToFile(MATRIX_CONSTS.RANDOM_MATRIX_FILENAME, matrix);

  res.status(201).sendFile(path.join(__dirname, `../data/${MATRIX_CONSTS.RANDOM_MATRIX_FILENAME}`), (err) => {
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

    for (const fileKey in files) {
      const file = files[fileKey][0];
      const { buffer } = file;
      
      const writeStream = fs.createWriteStream(path.join(__dirname, `../data/${fileKey}.txt`));
      streamifier.createReadStream(buffer).pipe(writeStream);
    }

    res.status(200).send('Uploaded the files');
});


/**
 * @description Calculate the product of the matrices
 */
router.get('/', (req, res) => {

});

export default router;
