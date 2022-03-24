import React, { useState } from 'react';

import './RightPanel.css';

export const RightPanel = () => {

    const [queue, setQueue] = useState(['Song1', 'Song2', 'Song3']);
    const [newPlaylist, setNewPlaylist] = useState(['Song1', 'Song2', 'Song3']);


    return (
        <div className='rightPanel'>
            <div className='toggleLists'>
                <form>    
                    <div>
                        <input type='radio' id='newPlaylist' name='renderList' value='newPlaylist' checked/>
                        <label htmlFor='newPlaylist'>New playlist</label>
                    </div>
                    <div>
                        <input type='radio' id='queue' name='renderList' value='queue' />
                        <label htmlFor='queue'>Player Queue</label>
                    </div>
                </form>
            </div>
            <div className='songList'>
                <h2 className='header2'>Create new playlist</h2>
                <input type='text' placeholder='Name your playlist' id='playlistName' />
                <ul>
                    {
                        newPlaylist.map((song) => {
                            return (
                                <li>
                                    <div className='trackInfo'>
                                        <span>{song}</span>
                                        <br/>
                                        <span>Song Artist</span>
                                    </div>
                                    <button id='play-btn'>&#9658;</button>
                                    <button id='remove-btn'>X</button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            <button id='savePlaylist'>Save Playlist</button>
        </div>
    )
}