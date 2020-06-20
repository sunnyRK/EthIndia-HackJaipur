import React, { Component } from 'react';
import { toast } from 'react-toastify';

import Kyber from './Kyber';
import { getRates, trade, approveContract } from './kyber-helper/kyberHelper';
import {
  MAX_ALLOWANCE, convertInWei,
  getSrcTokenContract, KYBER_NETWORK_PROXY_ADDRESS, TokenInfoArray,
} from '../../config/kyberconfig/kyberconfig';
import web3 from "../../biconomyProvider/realweb3";
const BN = require('bignumber.js');

class KyberContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstToken: '',
      secondToken: '',
      addQty: 0,
      respectiveQty: 0,
      expectedRate: 0,
      convertBtn: 0,
      swapLoadding: false,
      convertedValue: '',
    };
  }

  reverseToken = async () => {
    this.setState((prevState) => ({
      firstToken: prevState.secondToken,
      secondToken: prevState.firstToken,
    }));
  }

  kyberTrade = async (event) => {
    event.preventDefault();
    const {
      firstToken, secondToken, addQty, convertBtn,
      expectedrate,
    } = this.state;
    try {
      this.setState({ swapLoadding: true, errorMessage: '' });
      const accounts = await web3.eth.getAccounts();
      if (firstToken !== '') {
        if (secondToken !== '') {
          if (addQty !== '') {
            if (convertBtn === 1) {
              if (expectedrate * addQty > 0) {

                  // Calculate slippage rate
                  const results = await getRates(TokenInfoArray[0][firstToken].token_contract_address,
                    TokenInfoArray[0][secondToken].token_contract_address,
                    convertInWei(addQty, TokenInfoArray[0][firstToken].decimals));

                  // Check KyberNetworkProxy contract allowance
                  const contractAllowance = await getSrcTokenContract(TokenInfoArray[0][firstToken].token_contract_address).methods
                    .allowance(accounts[0], KYBER_NETWORK_PROXY_ADDRESS)
                    .call();

                    const bal0 = await getSrcTokenContract(TokenInfoArray[0][firstToken].token_contract_address).methods
                    .balanceOf(accounts[0])
                    .call();
                    console.log(bal0);

                  // // If insufficient allowance, approve else convert KNC to ETH.
                  if (convertInWei() <= contractAllowance) {
                    await trade(
                      TokenInfoArray[0][firstToken].token_contract_address,
                      convertInWei(addQty, TokenInfoArray[0][firstToken].decimals),
                      TokenInfoArray[0][secondToken].token_contract_address,
                      accounts[0],
                      MAX_ALLOWANCE,
                      results.slippageRate,
                      accounts[0],
                      firstToken,
                      secondToken,
                      addQty,
                    );
                  } else {
                    await approveContract(MAX_ALLOWANCE,
                      TokenInfoArray[0][firstToken].token_contract_address);
                    await trade(
                      TokenInfoArray[0][firstToken].token_contract_address,
                      convertInWei(addQty, TokenInfoArray[0][firstToken].decimals),
                      TokenInfoArray[0][secondToken].token_contract_address,
                      accounts[0],
                      MAX_ALLOWANCE,
                      results.slippageRate,
                      accounts[0],
                      firstToken,
                      secondToken,
                      addQty,
                    );
                  }
                  toast.success("Transaction Successfull!!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                  console.log('Kyber Transaction Done');
                

              } else {
                alert('Platform can not handle your amount this moment. Please reduce your amount.');
              }
            } else {
              alert(`Please convert ${firstToken} to ${secondToken} first by pressing Convert button.`);
            }
          } else {
            alert('Please add the add quantity field');
          }
        } else {
          alert('Please Select your desire token');
        }
      } else {
        alert('Please Select your token');
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({ swapLoadding: false });
  }

  convert = async () => {
    const {
      firstToken, secondToken, addQty,
    } = this.state;
    if (firstToken !== '') {
      if (secondToken !== '') {
        if (addQty !== '') {
          console.log('TokenInfoArray======', TokenInfoArray[0]);
          console.log('firstToken======', firstToken);
          console.log('secondToken======', secondToken);
          console.log('TokenInfoArray[0][firstToken]======', TokenInfoArray[0][firstToken]);
          console.log('TokenInfoArray[0][secondToken]======', TokenInfoArray[0][secondToken]);
          const results = await getRates(TokenInfoArray[0][firstToken].token_contract_address,
            TokenInfoArray[0][secondToken].token_contract_address, 
            parseInt(addQty)
          );
          const decimal = TokenInfoArray[0][secondToken].decimals;
          
          const expectedrateFromAPi = results.expectedRate / (new BN(1).times(10 ** decimal));

          this.setState({
            expectedrate: expectedrateFromAPi,
          });

          if(addQty == 0){
            return
          }

          if (expectedrateFromAPi * addQty > 0) {
          // //   // document.getElementById('demo').innerHTML = `${addQty} (${firstToken}) = ${expectedrateFromAPi * addQty} (${secondToken})`;
            this.setState({
              convertedValue: expectedrateFromAPi * addQty,
              convertBtn: 1,
            });
          } else {
            alert('Platform can not handle your amount this moment. Please reduce your amount.');
          }
        } else {
          this.setState({
            convertedValue: 0
          });
          alert('Please add the add quantity field');
        }
      } else {
        alert('Please Select your desire token');
      }
    } else {
      alert('Please Select your token');
    }
  };

  handleState = (value, callback) => {
    this.setState(value, () => {
      if (callback) callback();
    });
  }
  
  handleChangeforFirstToken = (e, { value }) => this.setState({ firstToken: value });

  handleChangeforSecondToken = (e, { value }) => this.setState({ secondToken: value });

  render() {
    const {
      firstToken, secondToken, addQty, swapLoadding,
      convertedValue,
    } = this.state;
    return (
      <Kyber
        firstToken={firstToken}
        secondToken={secondToken}
        addQty={addQty}
        handleChangeforFirstToken={this.handleChangeforFirstToken}
        kyberTrade={this.kyberTrade}
        reverseToken={this.reverseToken}
        handleChangeforSecondToken={this.handleChangeforSecondToken}
        convert={this.convert}
        handleState={this.handleState}
        swapLoadding={swapLoadding}
        convertedValue={convertedValue}
      />
    );
  }
}

export default KyberContainer;
