import express from 'express';
import routers from './routes';


// Configure the server
const app = express();
app.use(express.json());
app.use('/api/matrix', routers.matrixRouter);

// Start the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
