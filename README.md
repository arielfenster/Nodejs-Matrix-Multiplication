# Node.js Matrix Multiplication 
A Node.js server application (using Express.js) that the user can upload files containing matrices of numbers and perform their calculation using streams. The application has 3 endpoints:
1. Generate a matrix of random numbers with given height and width.
2. Upload two matrices files.
3. Get the product of the matrices.


### Setup
1. Make sure you have Node.js/NPM on your computer
2. Clone the project to your computer and open it
3. Install all the dependencies:
  ```
  npm install
  ```
4. Start the application:
  ```
  npm run start
  ```
5. Enjoy

### The application
The server exposes an API:
1. ```
    POST /api/matrix/generate
   ```
   Send a JSON request containing 'height' and 'width' fields and the server will generate a random matrix of numbers with the given dimensions.

2. ```
    POST /api/matrix
   ```
    Upload two matrices files to the server. Make sure the body is form-data. Make sure to upload them in order (the first matrix is the left one)

3. ```
    GET /api/matrix
   ```
    Get the product of the two matrices. Note that if the matrices' dimensions aren't compatible with each other then an error will be returned. 


# Using
0. Node.js
1. Express.js
2. Multer
3. math.js
4. csv-parse
5. csv-writer
6. streamifier
7. Postman