import React from 'react';

import { LeftPanel } from '../LeftPanel/LeftPanel'
import { RightPanel } from '../RightPanel/RightPanel';
import { MainPanel } from '../MainPanel/MainPanel';

export const Content = (props) => {
    
    return (
        <div>
            <MainPanel />
            <LeftPanel playlists={props.playlists} activeDevices={props.activeDevices} changeActiveDevice={props.changeActiveDevice} />
            <RightPanel />
        </div>
    )
}