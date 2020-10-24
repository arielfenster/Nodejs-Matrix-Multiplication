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
  const { height, width } = req.body;
  
  const matrix = matrixUtils.generateMatrix({ height, width });
  
  // Save the generated matrix. Notify the user if an error occurs
  try {
    const savedFilePath = await filesUtils.saveMatrixToFile({
      fileName: MATRIX_CONSTS.RANDOM_MATRIX_FILENAME,
      matrix
    });

    // Send the user the generated file
    return res.status(201).sendFile(savedFilePath, (err) => {
      if (err) { return res.status(500).end(err) }
    });

  } catch (error) {
    // Notify an error
    res.status(error.staus).json({
      success: false,
      message: `Error in generating the matrix: ${error.message}`
    });
  }
});


/**
 * @description Upload user's matrices. The files keys are expected to be 'A' and 'B' (not the files names).
 */
router.post('/', upload.fields([
  { name: UPLOAD_CONSTS.MATRIX_A, maxCount: 1 },
  { name: UPLOAD_CONSTS.MATRIX_B, maxCount: 1 }]), (req, res) => {

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
  // Create read streams based on the saved files paths
  const matrixAPath = filesUtils.getMatrixFilePath(UPLOAD_CONSTS.MATRIX_A);
  const matrixBPath = filesUtils.getMatrixFilePath(UPLOAD_CONSTS.MATRIX_B);

  const readStreamA = fs.createReadStream(matrixAPath, { encoding: 'utf-8' });
  const readStreamB = fs.createReadStream(matrixBPath, { encoding: 'utf-8' });

  // Perform the calculation. If an error occurs, end the process and send a message to the user
  let result;
  try {
    result = await mathUtils.calculate(readStreamA, readStreamB);
    
  } catch (error) {
    // Notify calculation error
    return res.status(500).json({
      success: false,
      message: `Error in calculating: ${error.message}`
    });
  }
  
  // Save the result matrix file. Notify the user if an error occurs
  try {
    const resultFilePath = await filesUtils.saveMatrixToFile({
      fileName: MATRIX_CONSTS.RESULT_MATRIX_FILENAME,
      matrix: result.valueOf()
    });
    
    return res.status(201).sendFile(resultFilePath, (err) => {
      if (err) { return res.status(500).send(err) }
    });

  } catch (error) {
    // Notify saving result matrix file error
    res.status(500).json({
      success: false,
      message: `Error in saving the result matrix file: ${error.message}`
    });
  }
});

export default router;
