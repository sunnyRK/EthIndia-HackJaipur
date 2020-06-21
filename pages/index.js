import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import Sidebar from '../components/Sidebar';

import web3 from '../web3Provider/realweb3';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      metamaskAddress: 'Not Logged In',
    };
  }

  async componentDidMount() {
    try {
      await window.ethereum.enable();
      window.web3 = web3;
      const accounts = await web3.eth.getAccounts();
      this.setState({
        metamaskAddress: accounts[0],
      });
    } catch (error) {
      console.log(error);
    }
  }

  onMenuItemClick = (index) => {
    this.setState({ activeIndex: index });
  }

  render() {
    const {
      activeIndex, metamaskAddress,
    } = this.state;
    return (
      <div className="dashboard">
        <ToastContainer />
        <Sidebar
          onMenuItemClick={this.onMenuItemClick}
          activeIndex={activeIndex}
          metamaskAddress={metamaskAddress}
        />
      </div>
    );
  }
}

export default Index;
