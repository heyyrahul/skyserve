import React from 'react';

const FileList = ({ files, onDelete }) => {
  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            {file.name} - {file.size} bytes
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
