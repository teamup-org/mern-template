import React from 'react';

const Library: React.FC = () => {
  const files = 

  return (
    <div className="grid-container">
      {files.map((file, index) => (
        <div key={index} className="grid-item">
          <img src={`/uploads/${file}`} alt={file} />
          <span>{file}</span>
        </div>
      ))}
    </div>
  );
};

export default Library;