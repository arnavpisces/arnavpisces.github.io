import * as React from "react"
import Layout from '../components/layout.js'
import Blob from '../components/blob.js'
import Posts from '../components/posts.js'
import Footer from '../components/footer.js'
import { pageText,highlight, featuredPosts, autoMargin, headFormat, socialText, linkedinIcon, spotifyIcon, githubIcon } from '../components/layout.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'gatsby'


const IndexPage = () => {
  return(
    <Layout pageTitle="ArnavK.co">
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
  <p className={pageText}>&#x1F44B; Hey I'm Arnav, an infrastructure engineer based in Bangalore.
  Currently working at <span className={highlight}>Rippling</span> in the DevX team, freeing up smart people to work on hard problems &#x1F3C3;</p>
  );
};

const Post = ({ headTitle, className  }) => {
  const classes = className ? `${featuredPosts} ${className}` : featuredPosts;
  return(
    <div className={autoMargin}>
      <h2 className={classes}>{headTitle}</h2>
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
      <Post headTitle="View More &#8594;" className={headFormat} />
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
