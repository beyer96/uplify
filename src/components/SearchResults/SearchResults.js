import React from "react";
import { SingleResult } from "../SingleResult/SingleResult";


const style = {
    listStyleType: 'none',
    padding: 0
}

export const SearchResults = (props) => {
    
    if(props.results === null) {
        return 'No results...';
    }

    if(props.typeOfSearch === "Spotify") {
        switch(props.typeOfFilter) {
            case 'Tracks':
                return (
                    <ul style={style}>
                        {
                        props.results.tracks.map((track, i) => {
                            return <SingleResult 
                                        key={i} 
                                        result={track} 
                                        type='track' 
                                        playChosenSong={props.playChosenSong}
                                        playChosenAlbum={props.playChosenAlbum}
                                        playChosenArtist={props.playChosenArtist}
                                        addToPlaylist={props.addToPlaylist}
                                        />
                        })
                        }
                    </ul>
                );
            case 'Albums':
                return (
                    <ul style={style}>
                        {
                        props.results.albums.map((album, i) => {
                            return <SingleResult 
                                        key={i} 
                                        result={album} 
                                        type='album' 
                                        playChosenSong={props.playChosenSong}
                                        playChosenAlbum={props.playChosenAlbum}
                                        playChosenArtist={props.playChosenArtist}
                                        addToPlaylist={props.addToPlaylist}
                                        />
                        })
                        }
                    </ul>
                );
            case 'Artists':
                return (
                    <ul style={style}>
                        {
                        props.results.artists.map((artist, i) => {
                            return <SingleResult 
                                        key={i} 
                                        result={artist} 
                                        type='artist' 
                                        playChosenSong={props.playChosenSong}
                                        playChosenAlbum={props.playChosenAlbum}
                                        playChosenArtist={props.playChosenArtist}
                                        addToPlaylist={props.addToPlaylist}
                                        />
                        })
                        }
                    </ul>
                );
            default:
                return null;

        }
    }
    return 'No results...';
}