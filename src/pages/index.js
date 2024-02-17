import * as React from "react"
import Layout from '../components/layout.js'
import Blob from '../components/blob.js'
import Posts from '../components/posts.js'
import Footer from '../components/footer.js'
import { pageText,highlight,highlightRippling, highlightZeta, featuredPosts, autoMargin, headFormat, socialText, linkedinIcon, spotifyIcon, githubIcon } from '../components/layout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'gatsby'


const IndexPage = () => {
  return(
    <Layout pageTitle="ArnavK.tech">
    </Layout>
  );
};
const BlobContent = () => {
  return (
    <Blob insideText="Infrastructure Engineer who's keen on making complex systems simpler">
    </Blob>
  );
};
const ParaAfterBlob = () => {
  return (
  <p className={pageText}>Hey👋 I'm Arnav, an infrastructure engineer (just a fancy term for someone who codes and automates processes in cloud). I'm fascinated by technology of all kinds but systems have my heart. I worked at <span className={highlightRippling}><a href="https://www.rippling.com" target="_blank">Rippling</a></span> in the Developer Experience(DevX) team and prior to that worked at <span className={highlightZeta}><a href="https://www.zeta.tech" target="_blank">Zeta</a></span> in the Platform Runtime team and partly in the Security Operations team.</p>
  );
};

const Post = ({ headTitle, className, link  }) => {
  const classes = className ? `${featuredPosts} ${className}` : featuredPosts;
  return(
    <div className={autoMargin}>
      <Link to href={link} target="_blank"><h2 className={classes}>{headTitle}</h2></Link>
    </div>
  )
}

const Socials = () => {
  return (
    <div className={socialText}>
        <Link to="https://linkedin.com/in/thisisak" target="_blank" className={linkedinIcon}>
          <FontAwesomeIcon icon={faLinkedin} size="3x" />
        </Link>
        <Link to="https://open.spotify.com/user/22m7eefrydcotr3jtwx7cf5li?si=510a7ab91e894dc8" target="_blank" className={spotifyIcon}>
          <FontAwesomeIcon icon={faSpotify} size="3x" />
        </Link>
        <Link to="https://github.com/arnavpisces" target="_blank" className={githubIcon}>
          <FontAwesomeIcon icon={faGithub} size="3x" />
        </Link>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <IndexPage />
      <BlobContent />
      <ParaAfterBlob />
      <Post headTitle="Selected Posts" />
      <Posts />
      <Post headTitle="View More &#8594;" className={headFormat} link="https://www.linkedin.com/in/thisisak/recent-activity/shares/"/>
      <Post headTitle="Socials" />
      <Socials />
      <Footer />
    </div>
  );
};


export const Head = () => <title >Arnav Kumar</title>

// export default { IndexPage, BlobContent};
export default App;
// export default IndexPage;
