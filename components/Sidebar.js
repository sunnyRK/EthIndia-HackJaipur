import React from 'react';

import {
  Header, Segment, Icon, Image, Menu, Sidebar,
} from 'semantic-ui-react';
import TransactionHistory from './transaction-history/TransactionHistoryContainer';
import ProfileActions from './profile-actions/ProfileActionsContainer';

export default ({
  menuItems, children, onMenuItemClick, activeIndex, onBiconomyLogin,
  biconomyAddress, biconomyLoginLoading, metamaskAddress, onDeposit, onWithdraw, handleChangeCollateralTokenSymbol
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
                <Icon name={item.icon} />
                {item.label}
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
                  <TransactionHistory />
                )
              }
            </div>
            <div className="profile-actions-wrapper">
              <ProfileActions
                onBiconomyLogin={onBiconomyLogin}
                biconomyAddress={biconomyAddress}
                biconomyLoginLoading={biconomyLoginLoading}
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
