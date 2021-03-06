import React from 'react';

import { LeftPanel } from '../LeftPanel/LeftPanel'
import { RightPanel } from '../RightPanel/RightPanel';
import { MainPanel } from '../MainPanel/MainPanel';

export const Content = (props) => {
    
    return (
        <div>
            <MainPanel 
                searchResults={props.searchResults}
                playChosenSong={props.playChosenSong}
                playChosenAlbum={props.playChosenAlbum}
                playChosenArtist={props.playChosenArtist}
                addToPlaylist={props.addToPlaylist}
            />
            <LeftPanel  
                playlists={props.playlists} 
                activeDevices={props.activeDevices} 
                currentTrack={props.currentTrack}
                playerPaused={props.playerPaused} 
                skipPrev={props.skipPrev}
                skipNext={props.skipNext}
                togglePlay={props.togglePlay}
                setVolume={props.setVolume}
                setTrackTime={props.setTrackTime}
                search={props.search}
                changeActiveDevice={props.changeActiveDevice} 
                getChosenPlaylist={props.getChosenPlaylist}
            />
            <RightPanel 
                playlistToCreate={props.playlistToCreate}
                playlistToDisplay={props.playlistToDisplay}
                playChosenSong={props.playChosenSong}
                createPlaylist={props.createPlaylist}
                deleteSongInPlaylist={props.deleteSongInPlaylist}
                deleteSongInPlaylistToCreate={props.deleteSongInPlaylistToCreate}
            />
        </div>
    )
}