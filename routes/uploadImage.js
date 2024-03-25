const { Router } = require('express')
const router = Router()

const multer  = require('multer');
const path = require('path');


// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Destination folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // Generate unique file name
  }
})

// Initialize multer middleware
const upload = multer({ storage: storage })

// Serve HTML form for uploading images
router.get('/upload', (req, res) => {
  res.render('upload-image')
});

// Handle file upload POST request
router.post('/upload', upload.single('image'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

// Serve uploaded images

module.exports = router