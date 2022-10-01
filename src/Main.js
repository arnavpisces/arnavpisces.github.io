import React, { Component, useEffect } from "react";
import {
  Route,
  Routes,
  NavLink,
  HashRouter
} from "react-router-dom";
import pdf from "./resume.pdf"
import Resume from "./resume"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMedium } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons'
library.add(faLinkedin, faMedium, faEnvelope, faMobileAlt)
const colors = ["#730ce9", "#ee1f1f", "#43e910", "#ffe600", "#00d5ff", "#730ce9", "#730ce9"]
var colorVal = Math.floor(Math.random() * colors.length);
console.log(colorVal);
// const element = <FontAwesomeIcon icon={faLinkedin} />

class Main extends Component {
  componentDidMount() { //This is called first
    // document.documentElement.style.cssText = "--color: "+colors[colorVal]+";" ;
    document.documentElement.style.cssText = "--color: "+"#fff"+";" ;
  }
  render (){
    return (
      <HashRouter>
        <div class="columns">
          <span class="resume"><a href="/resume" class="no-decoration" target="_blank" rel="noreferrer">Resume</a></span>
          <span class="topright"><a href="www.arnavk.co" class="no-decoration">ArnavK.Co</a></span>
          <div>
            <h1 class="neonText">hey there!</h1>
          </div>
          <div class="inner">
            <h4 class="smol">My name is </h4>
            {/* <FontAwesomeIcon icon={faLinkedin} /> */}
            <h1 class="name">Arnav</h1>
            <h4 class="smol">and I'm a</h4>
            <h2 class="designation">DevOps Engineer</h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <h4 class="smol">Let's Connect-</h4>
            <div class="icons">
              <a href="https://www.linkedin.com/in/thisisak" class="linkedin" target="_blank" rel="noreferrer"><FontAwesomeIcon icon="fab fa-linkedin" /></a>
              <a href="https://thisisarnav.medium.com/" class="medium" target="_blank" rel="noreferrer"><FontAwesomeIcon icon="fab fa-medium" /></a>
              <a href="mailto:arnavpisces@gmail.com" class="mail" target="_blank" rel="noreferrer"><FontAwesomeIcon icon="fa-solid fa-envelope" /></a>
              <a href="tel:+919868538952" class="phone" target="_blank" rel="noreferrer"><FontAwesomeIcon icon="fas fa-mobile-alt" /></a>
            </div>
            {/* <Routes> */}
              {/* <Route exact path="/resume" component={Resume}></Route> */}
            {/* </Routes> */}
            {/* <Link to='/resume'>Currency</Link> */}
            {/* <a href={pdf} target='_blank' rel='noopener noreferrer'>Resume</a> */}
            {/* <h2>Technology Enthusiast</h2> */}
          </div>
          
        </div>
      </HashRouter>
  
    );
  }
}

export default Main;