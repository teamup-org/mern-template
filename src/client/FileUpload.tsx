import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [wordCount3char, setWordCount3char] = useState<number | null>(null);
  const [wordCount4char, setWordCount4char] = useState<number | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('myFile', file, file.name);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { file: uploadedFilePath } = res.data;

      setUploadedFile(uploadedFilePath);
      setWordCount(null);
      setWordCount3char(null);
      setWordCount4char(null);

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
      } else {
        console.log('There was a problem with the server');
      }
    }
  };

  const fetchWordCount = async (minLength: number) => {
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.split('.').pop()?.toLowerCase();
    let endpoint = '';

    if (fileExtension === 'pdf') {
      endpoint = '/count-words-pdf';
    } else if (['jpeg', 'jpg', 'png'].includes(fileExtension!)) {
      endpoint = '/count-words-img';
    } else if (fileExtension === 'docx') {
      endpoint = '/count-words-docx';
    } else {
      console.error('Unsupported file type');
      return;
    }

    try {
      const res = await axios.get(endpoint, {
        params: { filePath: uploadedFile, minLength }
      });

      if (minLength === 1) {
        setWordCount(res.data.wordCount);
      } else if (minLength === 3) {
        setWordCount3char(res.data.wordCount);
      } else if (minLength === 4) {
        setWordCount4char(res.data.wordCount);
      }
    } catch (err) {
      console.error(`Failed to fetch word count (words >= ${minLength} characters):`, err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
          {/* <label htmlFor="file">{filename}</label> */}
        </div>
        <input type="submit" value="Upload" />
      </form>
      {uploadedFile ? (
        <div>
          <h3>{uploadedFile}</h3>
          <button onClick={() => fetchWordCount(1)}>Fetch Word Count</button>
          {wordCount !== null && <p>Total Words: {wordCount}</p>}
          <button onClick={() => fetchWordCount(3)}>Fetch Words more than 3 Characters</button>
          {wordCount3char !== null && <p>Words more than 3 characters: {wordCount3char}</p>}
          <button onClick={() => fetchWordCount(4)}>Fetch Words more than 4 Characters</button>
          {wordCount4char !== null && <p>Words more than 4 characters: {wordCount4char}</p>}
        </div>
      ) : (
        <div>
          <h3>{filename} not uploaded</h3>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
