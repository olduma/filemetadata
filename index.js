var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config()

var app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where you want to store uploaded files
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // Use the original filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Define a route for handling file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const fileSize = req.file.size; // This gets the file size in bytes
  const fileType = req.file.mimetype; // This gets the file type
  const fileName = req.file.originalname;
  // The uploaded file can be accessed as req.file
  res.json({ name: fileName, type: fileType, size: fileSize });
});


const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
