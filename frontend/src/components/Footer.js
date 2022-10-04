import React from "react";

const Footer = () => {
  return (
    <footer className="footer section">
      <p className="footer__copyrights">
        © {new Date().getFullYear()} Around The U.S.
      </p>
    </footer>
  );
};

export default Footer;
