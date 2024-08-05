const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");

const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
  console.log('Received request to extract text from PDF');
  if (!req.files || !req.files.pdfFile) {
    console.error('No file uploaded');
    res.status(400).send('No file uploaded');
    return;
  }

  console.log('Processing file:', req.files.pdfFile.name);

  pdfParse(req.files.pdfFile).then(result => {
    console.log('PDF parsed successfully');
    res.send(result.text);
  }).catch(error => {
    console.error('Error parsing PDF:', error);
    res.status(500).send('Error parsing PDF');
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
