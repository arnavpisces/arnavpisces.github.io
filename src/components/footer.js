import React from "react";
import { footerStyle, heart } from '../components/footer.module.css'

function Footer() {
  return (
    <div className={footerStyle}>
      Made with <span className={heart}>&#x2764;</span>, React and Gatsby
    </div>
  );
}

export default Footer;