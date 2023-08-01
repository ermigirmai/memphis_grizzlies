import React, { useState } from 'react';
import { CButton, CHeader, CHeaderBrand, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';

import logo from './grizzlies-logo.png'
import ComparePlayersModal from './ComparePlayersModal';
import WatchlistModal from './WatchlistModal';

const Header = () => {

    const [compareModalVisible, setCompareModalVisible] = useState(false);
    const [watchlistModalVisible, setWatchlistModalVisible] = useState(false);

    const openCompareModal = () => {
        setCompareModalVisible(true);
    }

    const openWatchlistModal = () => {
        setWatchlistModalVisible(true);
    }

    const closeCompareModal = () => {
        setCompareModalVisible(false);
    }

    const closeWacthlistModal = () => {
        setWatchlistModalVisible(false);
    }

  return (
    <div>
    <CHeader fixed="top" className="navbar navbar-expand-sm navbar-dark" style={{backgroundColor: 'white'}}>
      <CHeaderBrand className="navbar-brand">
        <img
          src={logo}
          alt="Header-Logo"
          style={{ height: '105px', marginRight: '5px' }}
        />
        Memphis Grizzlies Draft Room
      </CHeaderBrand>
      <CHeaderNav className="ml-auto">
        <CNavItem>
            <CButton hover style={{marginLeft: '4px', marginRight:'4px', backgroundColor: 'rgba(255, 188, 29, 1)', opacity:'0.88', outline: '2px solid #5d77aa', color: '#5d77aa'}} onClick={openWatchlistModal}>View WatchList</CButton>
        </CNavItem>
        <CNavItem>
            <CButton hover style={{marginLeft: '4px', marginRight:'4px', backgroundColor: 'rgba(255, 188, 29, 1)', opacity:'0.88', outline: '2px solid #5d77aa', color: '#5d77aa'}} onClick={openCompareModal}>Compare Players</CButton>
        </CNavItem> 
        <CNavItem>
          <CNavLink to="/compare">Contact</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink to="/compare">Calendar</CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
    <ComparePlayersModal show={compareModalVisible} onClose={closeCompareModal}/>
    <WatchlistModal show={watchlistModalVisible} onClose={closeWacthlistModal}/>
    </div>
  );
};

export default Header;
