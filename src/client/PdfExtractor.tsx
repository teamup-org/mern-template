import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import './PdfExtractor.css';

const PdfExtractor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resultText, setResultText] = useState<string>('');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      console.log('File selected:', event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', file);
    console.log('Uploading file:', file.name);

    try {
      const response = await fetch('/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Error in response:', response.statusText);
        return;
      }

      const extractedText = await response.text();
      console.log('Extracted Text:', extractedText); // Debugging log
      setResultText(extractedText.trim());

      const blob = new Blob([extractedText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="pdf-extractor-page">
      <Header />

      <main>
        <section className="intro-section">
          <h1>PDF Extractor</h1>
        </section>

        <section className="upload-section">
          <div className="file-upload">
            <label className="upload-btn">
              <input type="file" id="inpFile" onChange={handleFileChange} />
              <span>Upload resume</span>
            </label>
            <button type="button" className="primary-button" id="btnUpload" onClick={handleUpload}>Upload</button>
            <textarea
              id="resultText"
              className="resume-preview"
              value={resultText}
              readOnly
              placeholder="Your PDF text will appear here..."
            />
            {downloadUrl && (
              <a href={downloadUrl} download="extracted_text.txt" className="primary-button">
                Download as Text File
              </a>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PdfExtractor;
