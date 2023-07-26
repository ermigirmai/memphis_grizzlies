import React from 'react';
import { CHeader, CHeaderBrand, CHeaderNav, CNavItem, CNavLink } from '@coreui/react';
import logo from './grizzlies-logo.png'

const Header = () => {
  return (
    <CHeader fixed="top" className="navbar navbar-expand-sm navbar-dark">
      <CHeaderBrand className="navbar-brand">
        <img
          src={logo}
          alt="Header-Logo"
          style={{ height: '80px', marginRight: '10px' }}
        />
        Memphis Grizzlies
      </CHeaderBrand>
      <CHeaderNav className="ml-auto">
        <CNavItem>
          <CNavLink to="/dashboard">Dashboard</CNavLink>
        </CNavItem>
        {/* Add more navigation items here */}
      </CHeaderNav>
    </CHeader>
  );
};

export default Header;
