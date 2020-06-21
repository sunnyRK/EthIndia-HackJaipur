import React, { Component } from 'react';
import {Card} from 'semantic-ui-react';
import Axios from 'axios';
import web3 from '../../web3Provider/realweb3';

class TransactionHistory extends Component {

    state = {
        items: [],
        waitMessage: "Please wait..."
    }

    async componentDidMount(){  
        const accounts = await web3.eth.getAccounts();
        Axios.get('http://localhost:4000/api/get')
        .then(res => {
            if(res.statusText == "OK") {
  
              var items = [];
              var count = 0;
              if(res.data.length > 0) {
                  for(var j=0;j<res.data.length;j++) {
                      const TransactionDetails = res.data[j];
                      if (accounts[0] === TransactionDetails.web3from) {
                        var hashLink = "https://kovan.etherscan.io/tx/"+TransactionDetails.transactionHash;
                        items[count++] = {
                          header: (
                            <>
                              <span className="sub-heading">Transaction hash</span><br/>
                              <div className="transaction-address">
                                <a href={hashLink} target="blank">{TransactionDetails.transactionHash}</a>
                              </div>
                              <div className="sub-heading token-pair-address">Recipient Address: </div>
                              <div className="transaction-address"><a href="">{TransactionDetails.to}</a></div>
                            </>
                          ),
                          description: 'Amount: ' + TransactionDetails.value + " wei " + TransactionDetails.tokenSymbol,
                          fluid: true,
                        }
                      }
                  }
              }
              this.setState({
                items
              }, () => {
                  if(this.state.items.length == 0){
                      this.setState({
                          waitMessage: "You have not made any transaction yet."
                      });
                  }
              });
            } else {
                console.log(res);
                this.setState({
                  waitMessage: 'Something went wrong',
                });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({
              waitMessage: 'Something went wrong',
            });
        })
    }

    render() {
      return (
        <div className="transaction-history">
          <h4>Transaction History</h4>
          {
            this.state.items.length === 0 ? (
                <div style={{ fontSize: '16px' }}>{this.state.waitMessage}</div>
            ) : (
              <Card.Group items={this.state.items}/>
            )
          }
        </div>
      );
    }
}

export default TransactionHistory;
