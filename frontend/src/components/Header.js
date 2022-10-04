import React, { useEffect } from 'react';
import logo from '../images/logo.svg';
import { Navbar } from './Navbar';
import { MobileMenu } from './MobileMenu';

const Header = ({ loggedIn, email, handleSignout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!loggedIn) {
      setIsMobileMenuOpen(false);
    }
  }, [loggedIn]);

  return (
    <header className="header section">
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        email={email}
        handleSignout={handleSignout}
      />
      <div className="header__container">
        <img src={logo} alt="Around the US Logo" className="logo" />
        <Navbar
          loggedIn={loggedIn}
          email={email}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          handleSignout={handleSignout}
        />
      </div>
      <div className="separator"></div>
    </header>
  );
};

export default Header;
