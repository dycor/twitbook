import React from 'react';

import { OfflineIcon } from '../Icons';

const divStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  flexDirection: 'column',
  paddingTop: '1em'
}

const NetworkDetector = () => (
  <div style={divStyle}>
    <div>
      <OfflineIcon />
    </div>
    <div>
      <p>Looks like you lost your connection. Please check it and try again.</p>
    </div>
  </div>
);

export default NetworkDetector;
