import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Wallet from './Wallet';
import { getERCContractInstance } from './wallet-helper/walletinstance';
import web3 from '../../web3Provider/realweb3';
import { Router } from '../../routes';

import {
  transferErc20,
} from './wallet-helper/walletfunctions';
import { addTransaction } from './wallet-helper/walletapi';

class WalletContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tokenBalanceSymbol: 'DAI',
      tokenSymbol: 'DAI',
      sendLoanding: false,
      recipientAddress: '',
      value: '',
      metamaskAddress: 'Not Logged in',
      transactionLoading: false,
      checkBalanceLoading: false,
      tokenBalance: '',
    };
  }

  handleState = (key, value) => {
    this.setState({ [key]: value });
  }

  onTransactionHistory = async (event) => {
    event.preventDefault();
    try {
      this.setState({ transactionLoading: true });
      Router.pushRoute('/transactionHistory');
    } catch (err) {
      console.log(err);
      this.setState({ transactionLoading: false });
    }
  };

  checkBalance = async (event) => {
    event.preventDefault();
    const { tokenBalanceSymbol } = this.state;
    try {
      this.setState({ checkBalanceLoading: true });
      const accounts = await web3.eth.getAccounts();
      const _inst = await getERCContractInstance(web3, tokenBalanceSymbol);
      const balance = await _inst.methods.balanceOf(accounts[0]).call();

      const balanceinether = balance / 1000000000000000000;
      const tokenBalanceLine = `$${balanceinether.toFixed(2)}(${balance} in wei) ${tokenBalanceSymbol}`;
      this.setState({
        checkBalanceLoading: false,
        tokenBalance: tokenBalanceLine,
      });
    } catch (err) {
      console.log(err);
      this.setState({ checkBalanceLoading: false });
    }
  };

  handleChangeTokenSymbol = (e, { value }) => this.setState({ tokenSymbol: value });

  handleChangeTokenSymbolBalance = (e, { value }) => this.setState({ tokenBalanceSymbol: value });

  onSubmit = async (event) => {
    event.preventDefault();
    try {
      this.setState({ sendLoanding: true });
      const { recipientAddress } = this.state;
      const { value, tokenSymbol } = this.state;
      const walletAddress = '0xD16AdDBF04Bd39DC2Cb7F87942F904D4a7B8281B'; // spender address kovan

      const accounts = await web3.eth.getAccounts();
      // DAI 0x4441490000000000000000000000000000000000000000000000000000000000
      // TKN 0x544b4e0000000000000000000000000000000000000000000000000000000000

          const _inst = await getERCContractInstance(web3, tokenSymbol);
          const AddressBalance = await _inst.methods.balanceOf(accounts[0]).call();

          console.log(AddressBalance, value)
          if (parseInt(AddressBalance) >= parseInt(value)) {
            const hash = await transferErc20(web3, _inst, recipientAddress, value); // transfer
            if (hash[0]) {
              toast.success(`You have transferred ${value} ${tokenSymbol}`, {
                position: toast.POSITION.TOP_RIGHT,
              });
              toast.success("Transaction Hash: "+ hash, {
                  position: toast.POSITION.TOP_RIGHT
              });
              
              // Transaction added to transaction history
              await addTransaction(accounts[0], tokenSymbol, recipientAddress, parseInt(value), hash[1]);
            
            } else {
              toast.error('Transfer Failed!!', {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } else {
            toast.error('Not Enough Deposit crypto in biconomy account address. Plase deposit crypto by Deposit section.', {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
          this.setState({ sendLoanding: false });

    } catch (err) {
      this.setState({ sendLoanding: false });
      console.log(err);
    }
  };

  render() {
    const {
      metamaskAddress, transactionLoading, tokenBalanceSymbol, tokenSymbol, recipientAddress,
      tokenBalance, value, sendLoanding, checkBalanceLoading,
    } = this.state;
    return (
      <Wallet
        metamaskAddress={metamaskAddress}
        transactionLoading={transactionLoading}
        tokenBalanceSymbol={tokenBalanceSymbol}
        tokenSymbol={tokenSymbol}
        recipientAddress={recipientAddress}
        tokenBalance={tokenBalance}
        value={value}
        sendLoanding={sendLoanding}
        onTransactionHistory={this.onTransactionHistory}
        handleChangeTokenSymbol={this.handleChangeTokenSymbol}
        handleChangeTokenSymbolBalance={this.handleChangeTokenSymbolBalance}
        onSubmit={this.onSubmit}
        checkBalance={this.checkBalance}
        handleState={this.handleState}
        checkBalanceLoading={checkBalanceLoading}
      />
    );
  }
}

export default WalletContainer;
