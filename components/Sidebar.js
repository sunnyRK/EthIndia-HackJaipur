import React from 'react';

import {
  Header, Segment, Icon, Image, Menu, Sidebar,
} from 'semantic-ui-react';
import TransactionHistory from './transaction-history/TransactionHistoryContainer';
import ProfileActions from './profile-actions/ProfileActionsContainer';
import WalletContainer from './wallet/WalletContainer';
import KyberContainer from './kyber/KyberContainer';

// import EthIcon from '../assets/icons/eth.png';

const menuItems = [
  {
    icon: 'wallet.png',
    label: 'Wallet',
    content: <WalletContainer />,
    showTransactionHistory: true,
  },
  {
    icon: 'kyber.svg',
    label: 'Kyber',
    content: <KyberContainer />,
    showTransactionHistory: true,
  }
];

export default ({
  children, onMenuItemClick, activeIndex, metamaskAddress, onDeposit, onWithdraw, handleChangeCollateralTokenSymbol
  // showTransactionHistory,
}) => (
  <Sidebar.Pushable as={Segment} className="sidebar-wrapper">
    <Sidebar
      as={Menu}
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
      className="left-content"
    >
      {
            menuItems.map((item, index) => (
              <Menu.Item as="a" key={index} onClick={() => onMenuItemClick(index)} active={index === activeIndex}>
                {/* <Icon name={item.icon} /> */}
                <div className="sidebar-icon-wrapper">
                  <img src={`/static/${item.icon}`} className="sidebar-icon" alt="wallet-icon" />
                </div>
                <span>{item.label}</span>
              </Menu.Item>
            ))
          }
    </Sidebar>
    {
      menuItems.map((item, index) => {
        console.log('item=====', item.content);
        return activeIndex === index && (
          <Sidebar.Pusher key={index}>
            <div className="content-wrapper">
              {item.content}
              {
                item.showTransactionHistory && (
                  <div className="transaction-history-wrapper card">
                    <TransactionHistory />
                  </div>
                )
              }
            </div>
            <div className="profile-actions-wrapper">
              <ProfileActions
                metamaskAddress={metamaskAddress}
                // onDeposit={onDeposit}
                onWithdraw={onWithdraw}
                // handleChangeCollateralTokenSymbol={handleChangeCollateralTokenSymbol}
              />
            </div>
          </Sidebar.Pusher>
        );
      })
    }
  </Sidebar.Pushable>
);
