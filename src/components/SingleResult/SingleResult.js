import React from 'react';

import './SingleResult.css';

export const SingleResult = (props) => {
    function playChosenSong(e) {
        let uri = e.target.dataset.uri;
        props.playChosenSong(uri);
    }

    switch(props.type) {
        case 'track':
            return (
            <li key={props.key}>
                <div className='trackInfo'>
                    <span className='songName'>{props.result.name}</span>
                    <br/>
                    <span>{props.result.artist}</span>
                </div>
                <div className='trackAlbum'>{props.result.album || props.result.type}</div>
                <div className='buttons'>
                    <button id='play-btn' data-uri={props.result.uri} onClick={playChosenSong}>&#9658;</button>
                    <button id='add-btn'>+</button>
                </div>
            </li>
            );
        default:

    }

}