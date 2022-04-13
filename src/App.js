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
  const [playlistToCreate, setPlaylistToCreate] = useState([]);
  const [playlistToDisplay, setPlaylistToDisplay] = useState(null);

  async function handleLogin() {
    await Spotify.getToken(authCode);
    if(accessToken) {
      setGotToken(true);
      renderUserData();
    }
  }

  function renderUserData() {
    SpotifyPlayer.initializePlayer();
    setInterval(() => {
      updatePlayer();
      Spotify.getUserPlaylists().then(playlists => {
        setPlaylists(playlists);
      });
    }, 1000)
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
      Spotify.getActiveDevices().then(devices => {
        setActiveDevices(devices);
      });
      if(data === '204') {
        // No device to update right now
        return;
      } 
      // fetch currect time of track
      document.getElementById('songPosition').value = data.progress_ms;
      // check if is playing different song -> update currentTrack state if so
        setCurrentTrack({
          name: data.item.name,
          artist: data.item.artists[0].name,
          album: data.item.album.name,
          album_img: data.item.album.images[0].url,
          track_length: data.item.duration_ms,
          uri: data.item.uri
        })
        setPlayerPaused(!data.is_playing)
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

  function playChosenAlbum(context_uri) {
    Spotify.playChosenAlbum(context_uri);
  }

  function playChosenArtist(context_uri) {
    Spotify.playChosenArtist(context_uri);
  }   
  
  function addToPlaylist(song) {
    setPlaylistToCreate(prev => [...prev, song]);
  }

  function createPlaylist(name, tracks_uris) {
    Spotify.createPlaylist(name, tracks_uris);
    setPlaylistToCreate([])
  }

  function getChosenPlaylist(playlist_id) {
    Spotify.getChosenPlaylist(playlist_id).then(playlist => {
      setPlaylistToDisplay(playlist);
    })
  }

  function deleteSongInPlaylist(playlist_id, track_uri, index) {
    Spotify.deleteSongInPlaylist(playlist_id, track_uri);   // deletes track in Spotify
    Spotify.getChosenPlaylist(playlist_id).then(playlist => {     // deletes track in state to pass correct props
      playlist.tracks.splice(index, 1);
      setPlaylistToDisplay(playlist);
    })
  }

  function deleteSongInPlaylistToCreate(index) {
    playlistToCreate.splice(index, 1)
    setPlaylistToCreate(playlistToCreate);
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
        getChosenPlaylist={getChosenPlaylist}
        // mainPanel.js
        searchResults={searchResults}
        playChosenSong={playChosenSong} // also for rightPanel.js
        playChosenAlbum={playChosenAlbum}
        playChosenArtist={playChosenArtist}
        addToPlaylist={addToPlaylist}
        // rightPanel.js
        playlistToCreate={playlistToCreate}
        playlistToDisplay={playlistToDisplay}
        createPlaylist={createPlaylist}
        deleteSongInPlaylist={deleteSongInPlaylist}
        deleteSongInPlaylistToCreate={deleteSongInPlaylistToCreate}
        /> : <Login handleLogin={handleLogin} />}
    </div>
  );
}

export default App;
