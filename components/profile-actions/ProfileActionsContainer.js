import React, { Component } from 'react';

import ProfileActions from './ProfileActions';
import realweb3 from '../../biconomyProvider/realweb3';
class ProfileActionsContainer extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    collateralTokenSymbol: 'DAI',
    collateralUploadLoading: false,
    collateralValue: ''
  };

  render() {
    const {
      metamaskAddress,
    } = this.props;
    return (
      <ProfileActions
        metamaskAddress={metamaskAddress}
      />
    );
  }
}

export default ProfileActionsContainer;
