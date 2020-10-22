import express from "express";
import { generateMatrix, parseMatrix, saveMatrixToFile } from '../utils/matrix';
import path from 'path';


const router = express.Router();

/**
 * @description Generate a random matrix with given dimensions 
 */
router.post('/generate', (req, res) => {
  // Check the sizes entered
  const { height, width } = req.body;
  
  const matrix = generateMatrix({ height, width });
  
  saveMatrixToFile('random.txt', matrix);

  res.status(201).sendFile(path.join(__dirname, '../data/random.txt'), (err) => {
    if (err) { res.status(500).send(err) }
  });
});


/**
 * @description 
 */
router.get('/', (req, res) => {
  // const stream = fs.createReadStream(__dirname + '/data.txt', { encoding: 'utf-8'});
  // stream.pipe(res);
  // stream.on('data', (chunk) => {
  //   console.log('received');
  // });
  // stream.on('end', () => {
  //   res.status(200).send();
  // })
});

export default router;
