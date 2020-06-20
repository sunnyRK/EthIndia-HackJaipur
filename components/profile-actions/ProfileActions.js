import React from 'react';

const options = [
  {
    key: 'dai',
    text: (
      <div>
        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-512.png" className="ui avatar image" alt="coin" />
        DAI
      </div>
    ),
    value: 'DAI',
  },
  {
    key: 'weth',
    text: (
      <div>
        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-512.png" className="ui avatar image" alt="coin" />
        WETH
      </div>
    ),
    value: 'WETH',
  },
  {
    key: 'bat',
    text: (
      <div>
        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-512.png" className="ui avatar image" alt="coin" />
        BAT
      </div>
    ),
    value: 'BAT',
  },{
    key: 'knc',
    text: (
      <div>
        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-512.png" className="ui avatar image" alt="coin" />
        KNC
      </div>
    ),
    value: 'KNC',
  },
  {
    key: 'zil',
    text: (
      <div>
        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-512.png" className="ui avatar image" alt="coin" />
        ZIL
      </div>
    ),
    value: 'ZIL',
  },
  {
    key: 'tkn',
    text: (
      <div>
        <img src="https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/etherium_eth_ethcoin_crypto-512.png" className="ui avatar image" alt="coin" />
        TKN
      </div>
    ),
    value: 'TKN',
  },
];

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
