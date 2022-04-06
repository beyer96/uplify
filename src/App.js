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
  const [playerPaused, setPlayerPaused] = useState(true);
  const [currentTrack, setCurrentTrack] = useState({
    name: '',
    artist: '',
    album: '',
    album_img: '',
    track_length: '',
    uri: ''
  });
  const [searchResults, setSearchResults] = useState(null);

  async function handleLogin() {
    await Spotify.getToken(authCode);
    if(accessToken) {
      setGotToken(true);
      renderUserData();
      setInterval(() => {
        updatePlayer();
      }, 1000)
    }
  }

  function renderUserData() {
    SpotifyPlayer.initializePlayer();
    Spotify.getUserPlaylists().then(playlists => {
      setPlaylists(playlists);
    });
    Spotify.getCurrentTrack().then(track => {
      setCurrentTrack(track);
    })
    setTimeout(() => {
      Spotify.getActiveDevices().then(devices => {
        setActiveDevices(devices);
      });
    }, 1500);
  }

  function skipNext() {
    Spotify.skipToNext().then(() => {
      Spotify.getCurrentTrack().then(track => {
        setCurrentTrack(track);
      })
    })
  }
  function skipPrev() {
    Spotify.skipToPrev().then(() => {
      Spotify.getCurrentTrack().then(track => {
        setCurrentTrack(track);
      })
    })
  }
  function togglePlay() {
    if(playerPaused) {
      Spotify.play();
    } else {
      Spotify.pause();
    }
    setPlayerPaused(!playerPaused);
  }
  async function changeActiveDevice(e) {
    await Spotify.changeDevice(e.target.value);
    setPlayerPaused(false);
    Spotify.getCurrentTrack().then(track => {
      setCurrentTrack(track);
    })
  }
  function setVolume(volume) {
    Spotify.setPlayerVolume(volume);
  }
  function setTrackTime(position) {
    Spotify.setTrackTime(position);
  }

  function updatePlayer() {
    Spotify.updatePlayer().then(data => {
      // fetch currect time of track
      document.getElementById('songPosition').value = data.progress_ms;
      // check if is playing different song -> update currentTrack state if so
      if(currentTrack.uri !== data.item.uri) {
        setCurrentTrack({
          name: data.item.name,
          artist: data.item.artists[0].name,
          album: data.item.album.name,
          album_img: data.item.album.images[0].url,
          track_length: data.item.duration_ms,
          uri: data.item.uri
        })
      }
    })
  }

  function search(query) {
    Spotify.search(query).then(results => {
      setSearchResults(results);
    })
  }

  function playChosenSong(uri) {
    Spotify.playChosenSong(uri);
  }

  return (
    <div>  
      {gotToken ? <Content 
        // leftPanel.js
        playlists={playlists} 
        activeDevices={activeDevices} 
        currentTrack={currentTrack} 
        playerPaused={playerPaused}
        skipPrev={skipPrev}
        skipNext={skipNext}
        togglePlay={togglePlay}
        setVolume={setVolume}
        setTrackTime={setTrackTime}
        search={search}
        changeActiveDevice={changeActiveDevice} 
        // mainPanel.js
        searchResults={searchResults}
        playChosenSong={playChosenSong}
        /> : <Login handleLogin={handleLogin} />}
    </div>
  );
}

export default App;
