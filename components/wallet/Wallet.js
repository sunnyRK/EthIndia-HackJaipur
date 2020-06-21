import React from 'react';
import {
  Button,
  Form,
  Input,
  Dropdown,
} from 'semantic-ui-react';

export default ({recipientAddress,
  tokenBalance, value, sendLoanding, checkBalance,
  handleChangeTokenSymbolBalance, handleChangeTokenSymbol, onSubmit,
  handleState, checkBalanceLoading,
}) => {
  const options = [
    {
      key: 'dai',
      text: (
        <div>
          <img src="/static/dai.svg" className="ui avatar image" alt="coin" />
          DAI
        </div>
      ),
      value: 'DAI',
    },
    {
      key: 'weth',
      text: (
        <div>
          <img src="/static/eth.svg" className="ui avatar image" alt="coin" />
          WETH
        </div>
      ),
      value: 'WETH',
    },
    {
      key: 'bat',
      text: (
        <div>
          <img src="/static/bat.svg" className="ui avatar image" alt="coin" />
          BAT
        </div>
      ),
      value: 'BAT',
    },{
      key: 'knc',
      text: (
        <div>
          <img src="/static/knc.svg" className="ui avatar image" alt="coin" />
          KNC
        </div>
      ),
      value: 'KNC',
    },
    {
      key: 'zil',
      text: (
        <div>
          <img src="/static/zil.png" className="ui avatar image" alt="coin" />
          ZIL
        </div>
      ),
      value: 'ZIL',
    },
    {
      key: 'sai',
      text: (
        <div>
          <img src="/static/sai.svg" className="ui avatar image" alt="coin" />
          SAI
        </div>
      ),
      value: 'SAI',
    },
  ];
  return (
    <div className="wallet">
      <div className="card balance">
        <h4>Balance</h4>
        <Form onSubmit={checkBalance}>
          <Dropdown
            placeholder="Please Select"
            fluid
            selection
            options={options}
            className="balance-options"
            onChange={handleChangeTokenSymbolBalance}
          />
          {
            tokenBalance && (
              <div className="current-balance">
                <h3>Current Balance</h3>
                <div className="token-balance">{tokenBalance}</div>
              </div>
            )
          }
          <Button
            primary
            className="check-balance-button"
            type="submit"
            loading={checkBalanceLoading}
          >
            Check Balance
          </Button>
        </Form>
      </div>

      <div className="transfer-wrapper card">
        <h4>Transfer</h4>
        <div className="transfer-content">
          <div className="from-content">
            <h3>From :</h3>
            <Input
              label={(
                <Dropdown
                  options={options}
                  defaultValue={options[0].value}
                  className="from-token"
                  onChange={handleChangeTokenSymbol}
                />
              )}
              labelPosition="left"
              placeholder="0 Wei"
              value={value}
              onChange={(event) => handleState('value', event.target.value)}
            />
          </div>
          <div className="middle-content"><i className="transfer_arrow" /></div>
          <div className="to-content">
            <h3>To Address :</h3>
            <Input
              labelPosition="left"
              placeholder="0x0de..."
              value={recipientAddress}
              onChange={(event) => handleState('recipientAddress', event.target.value)}
            />
          </div>
        </div>
        <div className="transfer-footer">
          <Button
            primary
            bsStyle="primary"
            type="submit"
            loading={sendLoanding}
            onClick={(event) => onSubmit(event)}
            className="transfer-button"
          >
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};
