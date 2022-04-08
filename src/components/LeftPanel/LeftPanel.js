import React from 'react';

import './LeftPanel.css';

export const LeftPanel = (props) => {
    function skipToNextSong() {
        props.skipNext();
    }
    function skipToPrevSong() {
        props.skipPrev();
    }
    function togglePlayButton() {
        props.togglePlay();
    }
    function setPlayerVolume(e) {
        props.setVolume(Number(e.target.value));
    }
    function setTrackTime(e) {
        props.setTrackTime(Number(e.target.value));
    }
    function searchTerm(e) {
        props.search(e.target.value);
    }
    return (
        <div className='leftPanel'>
            <input className='search' type='text' placeholder='Search tracks, artists,...' onChange={searchTerm}/>
            <h2 className='header2'>My playlists</h2>
            <div className='playlists-holder'>
                <ul>
                    {props.playlists.map((playlist, index) => {
                        return (<li key={index}><button className='playlistButton'>{playlist.name}</button></li>)
                    })}
                </ul>
            </div>
            <div className='audioPlayer'>
                <h2 className='header2'>Audio player</h2>
                <img src={props.currentTrack.album_img} alt='' />
                <div className='audioPlayer-trackInfo'>
                    <p className='audioPlayer-songName'>{props.currentTrack.name}</p>
                    <p className='audioPlayer-artistName'>{props.currentTrack.artist}</p>
                    <p className='audioPlayer-albumName'>{props.currentTrack.album}</p>
                </div>
                <div className='audioPlayer-controls'>
                    <input type='range' id='songPosition' min='0' max={props.currentTrack.track_length} onMouseUp={setTrackTime}/>
                    <br />
                    <div className='controlButtons'>
                        <button id="prev" onClick={skipToPrevSong}>&laquo;</button>        
                        <button id="play" onClick={togglePlayButton}>{props.playerPaused ? 'PLAY' : 'PAUSE'}</button>
                        <button id="next" onClick={skipToNextSong}>&raquo;</button>
                    </div>
                    <br />
                    <br />
                    <label htmlFor='vol'>Volume: </label>
                    <input type='range' id='volume' min='0' max='100' step='1' onMouseUp={setPlayerVolume}/>
                </div>
                <label htmlFor='devices'>Toggle active devices</label>
                <select id='devices' onChange={props.changeActiveDevice}>
                    {(props.activeDevices.find(device => device.is_active) === undefined) ? <option>Choose device</option> : null}
                    {props.activeDevices.map((device, i) => {
                        return (<option key={i} value={device.id}>{device.name}</option>)
                    })}
                </select>
            </div>
        </div>
    )
}