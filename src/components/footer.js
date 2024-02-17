import React from "react";
import { footerStyle, heart } from '../components/footer.module.css'

function Footer() {
  return (
    <div className={footerStyle}>
      Made with React, Gatsby and <span className={heart}>&#x2764;</span>
    </div>
  );
}

export default Footer;