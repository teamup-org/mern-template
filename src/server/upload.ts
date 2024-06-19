import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadFolder = './uploads/';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir(uploadFolder, { recursive: true }, function (err) {
      if (err) {
        console.error('Error creating upload folder:', err);
      }
      cb(null, uploadFolder);
    });
  },
  filename: function (req, file, cb) {
    const originalName = path.parse(file.originalname).name; // Get the name without the extension
    const extension = path.extname(file.originalname);
    cb(null, `${originalName}-${Date.now()}${extension}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 }, // 100MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myFile'); // 'myFile' is the name attribute in the form

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Unsupported file upload type'));
  }
}

export default upload;
