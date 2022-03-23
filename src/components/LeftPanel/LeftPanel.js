import React, {useState} from 'react';

import './LeftPanel.css';

export const LeftPanel = () => {

    const [playlists, setPlaylists] = useState(['Playlist1' , 'Playlist2', 'Playlist3']);
    const [activeDevices, setActiveDevices] = useState(['Device1', 'Device2']);

    return (
        <div className='panel'>
            <input className='search' type='text' placeholder='Search tracks, artists,...' />
            <div className='playlists-holder'>
                <h2>My playlists</h2>
                <ul>
                    {playlists.map((playlist) => {
                        return (<li><button>{playlist}</button></li>)
                    })}
                </ul>
            </div>
            <div className='audioPlayer'>
                <h2>Audio player</h2>
                <img src='https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/WSS_Sleeps_Society_cover.jpg/220px-WSS_Sleeps_Society_cover.jpg' />
                <div className='audioPlayer-trackInfo'>
                    <p className='audioPlayer-songName'>Nervous</p>
                    <p className='audioPlayer-artistName'>While She Sleeps</p>
                    <p className='audioPlayer-albumName'>Sleeps Society</p>
                </div>
                <div className='audioPlayer-controls'>
                    <input type='range' id='songPosition' />
                    <br />
                    <button>Prev</button>
                    <button>&#9658;</button>
                    <button>Next</button>
                    <br />
                    <br />
                    <label for='vol'>Volume: </label>
                    <input type='range' id='vol' />
                </div>
                <br />
                <label for='devices'>Toggle active devices</label>
                <select id='devices'>
                    {activeDevices.map((device) => {
                        return (<option>{device}</option>)
                    })}
                </select>
            </div>
        </div>
    )
}