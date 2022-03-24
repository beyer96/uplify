import React from 'react';

import { LeftPanel } from '../LeftPanel/LeftPanel'
import { RightPanel } from '../RightPanel/RightPanel';
import { MainPanel } from '../MainPanel/MainPanel';

export const Content = () => {
    
    return (
        <div>
            <MainPanel />
            <LeftPanel />
            <RightPanel />
        </div>
    )
}