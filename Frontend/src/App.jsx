// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import FileUpload from './components/FileManagement/FileUpload';
import FileList from './components/FileManagement/FileList';
import Map from './components/Map/Map';
import DrawMap from './components/Map/DrawMap';
import { Auth0Provider } from '@auth0/auth0-react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    // Implement logout logic here
  };

  const handleUpload = (file) => {
    setUploadedFiles([...uploadedFiles, file]);
  };

  const handleDelete = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  return (
    <Router>
      <Auth0Provider
        domain="heyyrahul.us.auth0.com"
        clientId="WrUCljOzClzGjPPwErY9ttxwMcUjkdnF"
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
      >
        <Navbar isAuthenticated={isAuthenticated} username={username} onLogout={handleLogout} />
        
        <Routes>
    
          <Route exact path="/" element={<FileUpload onUpload={handleUpload} />} />
          <Route exact path="/filelist" element={<FileList files={uploadedFiles} onDelete={handleDelete} />} />
          <Route exact path="/" element={<Map />} />
          <Route exact path="/draw" element={<DrawMap />} />
        </Routes>

        {/* Render map component here */}
        {uploadedFiles.length > 0 && (
          <Map />
        )}
      </Auth0Provider>
    </Router>
  );
};

export default App;
