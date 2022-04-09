import React from 'react';

import './SingleResult.css';

export const SingleResult = (props) => {
    function playChosenSong(e) {
        let uri = e.target.dataset.uri;
        props.playChosenSong(uri);
    }

    function playChosenAlbum(e) {
        let context_uri = e.target.dataset.context_uri;
        props.playChosenAlbum(context_uri);
    }

    function playChosenArtist(e) {
        let context_uri = e.target.dataset.context_uri;
        props.playChosenArtist(context_uri);
    }

    switch(props.type) {
        case 'track':
            return (
            <li>
                <div className='trackInfo'>
                    <span className='songName'>{props.result.name}</span>
                    <br/>
                    <span>{props.result.artist}</span>
                </div>
                <div className='trackAlbum'>{props.result.album}</div>
                <div className='buttons'>
                    <button id='play-btn' data-uri={props.result.uri} onClick={playChosenSong}>&#9658;</button>
                    <button id='add-btn'>+</button>
                </div>
            </li>
            );
        case 'album':
            return (
                <li>
                    <div className='albumInfo'>
                        <span className='albumName'>{props.result.name}</span>
                        <br/>
                        <span>{props.result.artist}</span>
                    </div>
                    <div className='albumType'>{props.result.type}</div>
                    <div className='buttons'>
                        <button id='play-btn' data-album_id={props.result.id} data-context_uri={props.result.context_uri} onClick={playChosenAlbum}>&#9658;</button>
                    </div>
                </li>
            );
        case 'artist':
            return (
                <li>
                    <div className='artistInfo'>{props.result.name}</div>
                    <div className='buttons'>
                        <button id='play-btn' data-context_uri={props.result.context_uri} onClick={playChosenArtist}>&#9658;</button>
                    </div>
                </li>
            )
        default:

    }

}