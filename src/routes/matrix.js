import express from "express";
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
    if (err) { res.status(500).end(err) }
  });
});


/**
 * @description Upload user's matrices
 */
router.post('/', upload.fields([
  { name: UPLOAD_CONSTS.MATRIX_A, maxCount: 1 },
  { name: UPLOAD_CONSTS.MATRIX_B, maxCount: 1 }]) ,(req, res) => {

    const { files } = req;
    filesUtils.uploadMatricesFiles(files);
    
    res.status(200).json({
      success: true,
      message: 'Uploaded files'
    });
});


/**
 * @description Calculate the product of the matrices
 */
router.get('/', async (req, res) => {
  const matrixAPath = filesUtils.getMatrixFilePath(UPLOAD_CONSTS.MATRIX_A);
  const matrixBPath = filesUtils.getMatrixFilePath(UPLOAD_CONSTS.MATRIX_B);

  const readStreamA = fs.createReadStream(matrixAPath, { encoding: 'utf-8' });
  const readStreamB = fs.createReadStream(matrixBPath, { encoding: 'utf-8' });

  const result = await mathUtils.calculate({
    fileAStream: readStreamA,
    fileBStream: readStreamB,
  });
  
  const resultFilePath = await filesUtils.saveMatrixToFile({ fileName: MATRIX_CONSTS.RESULT_MATRIX_FILENAME, matrix: result.valueOf() });
  
  res.status(201).sendFile(resultFilePath, (err) => {
    if (err) { res.status(500).end(err) }
  });
});

export default router;
