import express from "express";
import { generateEmptyMatrix, populateMatrix, getVisualizedMatrix } from '../utils/matrix';

const router = express.Router();

/**
 * @description Generate a random matrix with given dimensions 
 */
router.post('/generate', (req, res) => {
  // Check the sizes entered
  const { height, width } = req.body;
  
  const matrix = generateEmptyMatrix({ height, width });
  populateMatrix(matrix);
  const output = getVisualizedMatrix(matrix);

  res.status(201).send(output);
});


export default router;
