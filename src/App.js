import React, { useState } from 'react';
import { Login } from './components/Login/Login'
import { Content } from './components/Content/Content'
import { authCode, accessToken, Spotify } from './util/Spotify/Spotify';
import { SpotifyPlayer } from './util/Spotify/SpotifyPlayer';
import './App.css';

const App = () => {
  window.addEventListener('load', () => {
    Spotify.getAuthCode();
  })

  const [gotToken, setGotToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [activeDevices, setActiveDevices] = useState([]);

  async function handleLogin() {
    await Spotify.getToken(authCode);
    if(accessToken) {
      setGotToken(true);
      renderUserData();
    }
  }

  function renderUserData() {
    SpotifyPlayer.initializePlayer();
    Spotify.getUserPlaylists().then(response => {
      setPlaylists(response);
    });
    setTimeout(() => {
      Spotify.getActiveDevices().then(response => {
        setActiveDevices(response);
      })
    }, 1000);
  }

  function changeActiveDevice(e) {
    Spotify.changeDevice(e.target.value);
  }

  return (
    <div>  
      {gotToken ? <Content playlists={playlists} activeDevices={activeDevices} changeActiveDevice={changeActiveDevice} /> : <Login handleLogin={handleLogin} />}
    </div>
  );
}

export default App;
