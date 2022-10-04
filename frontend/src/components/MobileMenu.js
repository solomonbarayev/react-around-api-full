import React from 'react';
import { Link } from 'react-router-dom';

export function MobileMenu(props) {
  return (
    <div
      className={`header__mobile-menu ${
        props.isMobileMenuOpen ? 'header__mobile-menu_opened' : ''
      }`}
    >
      <ul className="header__links header__links_mobile">
        <li className="header__link-item">{props.email}</li>
        <li className="header__link-item">
          <Link
            to="/signin"
            className="header__link"
            onClick={props.handleSignout}
          >
            Log out
          </Link>
        </li>
      </ul>
      <div className="separator separator_type_mobile-menu"></div>
    </div>
  );
}
