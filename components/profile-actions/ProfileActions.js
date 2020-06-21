import React from 'react';

const ProfileActions = ({
  metamaskAddress,
}) => (
  <div className="login-info">
    <div className="metamask-info card">
      <h4>Metamask address</h4>
      <div className="address">{metamaskAddress}</div>
    </div>    
  </div>
);

export default ProfileActions;
