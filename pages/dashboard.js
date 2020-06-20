import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import WalletContainer from '../components/wallet/WalletContainer';
import KyberContainer from '../components/kyber/KyberContainer';
import Sidebar from '../components/Sidebar';

import web3 from '../biconomyProvider/realweb3';

const menuItems = [
  {
    icon: 'google wallet',
    label: 'Wallet',
    content: <WalletContainer />,
    showTransactionHistory: true,
  },
  {
    icon: 'chevron right',
    label: 'Kyber',
    content: <KyberContainer />,
    showTransactionHistory: true,
  }
];

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
      await window.ethereum.enable()
      window.web3 = web3  
      const accounts = await web3.eth.getAccounts();
        this.setState({
          metamaskAddress: accounts[0],
        });
    } catch (error) {
      console.log(error)
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
          menuItems={menuItems}
          metamaskAddress={metamaskAddress}
        />
        {/* <ProfileActions /> */}
      </div>
    );
  }
}

export default Index;
