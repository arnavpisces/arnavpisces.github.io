import * as React from 'react'
import { Link } from 'gatsby'
import {
  container,
  heading,
  navLinks,
  navLinkItem,
  navLinkText
} from '../components/layout.module.css'

const Layout = ({pageTitle, children}) => {
  return (
    <div className={container}>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}style={{ marginRight: "auto" }}>
            <h1 className={heading}><Link to="#">{pageTitle}</Link></h1>
          </li>
          {/* <li className={navLinkItem}><Link to="/" className={navLinkText}>Home</Link></li> */}
          <li className={navLinkItem}><Link to="https://drive.google.com/file/d/1nqtWCx6X899YOiXrCXz9e5HIxoCrVgKZ/view?usp=sharing" target="_blank" className={navLinkText}>Resume</Link></li>
        </ul>
      </nav>
    </div>
  )
}

export default Layout