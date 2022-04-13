import React, { useEffect, useState } from 'react';

import './RightPanel.css';

export const RightPanel = (props) => {

    const [checkedButton, setCheckedButton] = useState();

    useEffect(() => {
        setCheckedButton('showPlaylist');
        document.getElementById('showPlaylist').checked = true;
    }, [props.playlistToDisplay])

    useEffect(() => {
        setCheckedButton('newPlaylist');
        document.getElementById('newPlaylist').checked = true;
    }, [props.playlistToCreate])

    function changeLayout(e) {
        let layout = e.target.id;
        setCheckedButton(layout);
    }

    function playChosenSong(e) {
        let uri = e.target.dataset.uri;
        props.playChosenSong(uri);
    }

    function deleteSongInPlaylist(e) {
        props.deleteSongInPlaylist(e.target.dataset.playlist_id, e.target.dataset.uri, e.target.dataset.key)
    }

    function deleteSongInPlaylistToCreate(e) {
        props.deleteSongInPlaylistToCreate(e.target.dataset.key)
    }

    function createPlaylist(e) {
        let name = document.getElementById('playlistName').value;
        let track_uris = props.playlistToCreate.map(track => track.uri)
        props.createPlaylist(name, track_uris);
        document.getElementById('playlistName').value = '';
    }

    function renderLayout() {
        switch(checkedButton) {
            case 'newPlaylist': 
                return (
                    <div className='songList'>
                        <h2 className='header2'>Create new playlist</h2>
                        <input type='text' placeholder='Name your playlist' id='playlistName' />
                        <ul>
                            {
                                props.playlistToCreate.length > 0 && props.playlistToCreate.map((song, i) => {
                                    return (
                                        <li key={i}>
                                            <div className='trackInfo'>
                                                <span>{song.name}</span>
                                                <br/>
                                                <span>{song.artist}</span>
                                            </div>
                                            <button id='play-btn' data-uri={song.uri} onClick={playChosenSong}>&#9658;</button>
                                            <button id='remove-btn' data-key={i} onClick={deleteSongInPlaylistToCreate}>X</button>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <button id='savePlaylist' onClick={createPlaylist}>Save Playlist</button>
                    </div>
                )

            case 'showPlaylist':
                if(props.playlistToDisplay === null) {
                    return <p>Select playlist to display on the left panel...</p>;
                }
                return (
                    <div className='songList'>
                        <h2 className='header2'>{props.playlistToDisplay.name}</h2>
                        <ul>
                            {
                                props.playlistToDisplay.tracks.map((trackObject, i) => {
                                    return (
                                        <li key={i}>
                                            <div className='trackInfo'>
                                                <span>{trackObject.track.name}</span>
                                                <br/>
                                                <span>{trackObject.track.artists[0].name}</span>
                                            </div>
                                            <button id='play-btn' data-uri={trackObject.track.uri} onClick={playChosenSong}>&#9658;</button>
                                            <button id='remove-btn' data-key={i} data-uri={trackObject.track.uri} data-playlist_id={props.playlistToDisplay.id} onClick={deleteSongInPlaylist}>X</button>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )
            default:
                return;
        }
    }

    return (
        <div className='rightPanel'>
            <div className='toggleLists'>
                <form onClick={changeLayout}>    
                        <input type='radio' id='newPlaylist' name='renderList' value='newPlaylist'/>
                        <label htmlFor='newPlaylist'>New playlist</label>
                        <br />
                        <input type='radio' id='showPlaylist' name='renderList' value='showPlaylist' />
                        <label htmlFor='showPlaylist'>Show my playlist</label>
                </form>
            </div>

            {
                renderLayout()
            }

            
        </div>
    )
}