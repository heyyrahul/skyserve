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

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    // Implement logout logic here
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
          <Route exact path="/login" element={<Login onLogin={handleLogin} />} />
          <Route exact path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route exact path="/upload" element={<FileUpload />} />
          <Route exact path="/files" element={<FileList />} />
          <Route exact path="/map" element={<Map />} />
          <Route exact path="/draw" element={<DrawMap />} />
        </Routes>
      </Auth0Provider>
    </Router>
  );
};

export default App;
