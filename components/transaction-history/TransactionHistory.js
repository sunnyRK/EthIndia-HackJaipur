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
                        items[count++] =  {
                            header: (<a href={hashLink}>Transaction Hash: {TransactionDetails.transactionHash}</a>),
                            meta: "Recipient Address: " + TransactionDetails.to,
                            description: 'Amount: ' + TransactionDetails.value + " wei " + TransactionDetails.tokenSymbol,      
                            fluid: true,
                            style: { overflowWrap: 'break-word' }
                        };
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
                // alert("Error");
            }
        })
        .catch(err => {
            console.log(err);
            // alert("Catch");
        })
    }

    render() {
      return (
        <div className="transaction-history card">
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
