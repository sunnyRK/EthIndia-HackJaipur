import React from 'react';

import { Segment, Menu, Sidebar, Icon } from 'semantic-ui-react';
import TransactionHistory from './transaction-history/TransactionHistoryContainer';
import ProfileActions from './profile-actions/ProfileActionsContainer';
import WalletContainer from './wallet/WalletContainer';
import KyberContainer from './kyber/KyberContainer';

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
  },
];

export default ({
  onMenuItemClick, activeIndex, metamaskAddress, onDeposit,
  onWithdraw,
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
                <Icon name={item.icon} />
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
