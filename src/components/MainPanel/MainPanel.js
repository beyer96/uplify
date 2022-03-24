import React, {useState} from 'react';

import './MainPanel.css';

export const MainPanel = () => {

const [results, setResults] = useState([
    {song: 'Nervous', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'You Are All You Need', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Sleeps Society', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Enlightement', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Sleeps Society', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Enlightement', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Sleeps Society', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Enlightement', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Sleeps Society', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Enlightement', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Sleeps Society', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Enlightement', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Sleeps Society', artist: 'While She Sleeps', album: 'Sleeps Society'},
    {song: 'Enlightement', artist: 'While She Sleeps', album: 'Sleeps Society'}
]);

    return (
        <div className='mainPanel'>
            <h1 className='header1'>Up-lify app</h1>
            <div className='searchContainer'>
                <div className='control-panel'>
                    <div className='chooseResults'>
                        <button id='spotify-results'>Spotify results</button>
                        <button id='personal-results'>Personal results</button>
                    </div>
                    <div className='filters'>
                        <button id='tracks' className='filter'>Tracks</button>
                        <button id='artists' className='filter'>Artists</button>
                        <button id='albums' className='filter'>Albums</button>
                    </div>
                </div>
                <div className='searchResults'>
                    <h2 className='header2'>Spotify results - tracks</h2>
                    <div className='results'>
                        <ul>
                            {
                                results.map((result) => {
                                    return (
                                        <li>
                                            <div className='trackInfo'>
                                                <span className='songName'>{result.song}</span>
                                                <br/>
                                                <span>{result.artist}</span>
                                            </div>
                                            <div className='trackAlbum'>{result.album}</div>
                                            <div className='trackLength'>3:33</div>
                                            <div className='buttons'>
                                                <button id='play-btn'>&#9658;</button>
                                                <button id='remove-btn'>X</button>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}