import React, { useState } from 'react';
import axios from 'axios';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const [wordCount, setWordCount] = useState<number | null>(null);
  const [wordCount3char, setWordCount3char] = useState<number | null>(null);


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

    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data.message);
      } else {
        console.log('There was a problem with the server');
      }
    }
  };

  const fetchWordCount = async () => {
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.split('.').pop()?.toLowerCase();
    let endpoint = '';

    if (fileExtension === 'pdf') {
      endpoint = '/count-words';
    } else if (['jpeg', 'jpg', 'png'].includes(fileExtension!)) {
      endpoint = '/count-words-img';
    } else {
      console.error('Unsupported file type');
      return;
    }

    try {
      const res = await axios.get(endpoint, {
        params: { filePath: uploadedFile },
      });

      setWordCount(res.data.wordCount);
    } catch (err) {
      console.error('Failed to fetch word count:', err);
    }
  };

  const fetchWordCount3char = async () => {
    if (!uploadedFile) return;

    try {
      const wordCount3charRes = await axios.get(`/count-words-3char?filePath=${uploadedFile}`);
      setWordCount3char(wordCount3charRes.data.wordCount);
    } catch (err) {
      console.error('Failed to fetch word count (words > 3 characters):', err);
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
          <button onClick={fetchWordCount}>Fetch Word Count</button>
          {wordCount !== null && <p>Total Words: {wordCount}</p>}
          <button onClick={fetchWordCount3char}>Fetch Words more than 3 Characters</button>
          {wordCount3char !== null && <p>Words more than 3 characters: {wordCount3char}</p>}
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