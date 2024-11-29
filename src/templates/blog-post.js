import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SubscribeForm from '../components/SubscribeForm'

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <div className="mx-auto px-4 py-8" style= {{ maxWidth: '52rem' }}>
        <Link to="/" className="inline-block mb-4 text-gray-400 text-sm uppercase flex items-center">
          <span className="mr-2">←</span>
          Return to Home
        </Link>

        <header className="text-center mb-16">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full overflow-hidden border border-gray-700">
            <img 
              src="/images/arnav-kumar.jpeg"
              alt="Arnav Kumar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-base mb-4 tracking-widest text-gray-400">ARNAV KUMAR</h1>
        </header>

        <header className="mb-8 text-center">
          <time className="text-gray-400 text-sm">
            {post.frontmatter.date}
          </time>
          <h1 className="text-4xl font-bold mt-2">
            {post.frontmatter.title}
          </h1>
        </header>
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.html }} 
        />

        {/* Bio Section */}
        <div className="text-center mt-8">
          <h1 className="text-base mb-4 tracking-widest text-gray-400">ABOUT ARNAV KUMAR</h1>
          <p className="text-gray-400 mb-2 text-lg">
            Software Engineer specialized in platform and cloud-native architectures. Previously at <a href="https://zeta.tech/" target='_blank' rel="noreferrer" className="underline">Zeta</a>, 
            <a href="https://rippling.com/" target='_blank' rel="noreferrer" className="underline"> Rippling</a>, 
            and <a href="https://quandlelabs.com/" target='_blank' rel="noreferrer" className="underline"> Quandle Labs</a>, building scalable infrastructure and driving efficiency in developer workflows. Currently experimenting with <a href="https://en.wikipedia.org/wiki/High-frequency_trading" target="_blank" rel='noreferrer'className='underline'>HFT</a> systems.
          </p>
        </div>
        <div className="flex justify-center space-x-4 mb-5">
            <a href="https://www.linkedin.com/in/thisisak/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
            <a href="https://open.spotify.com/user/22m7eefrydcotr3jtwx7cf5li?si=76a4d1da0c3542a1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-spotify fa-2x"></i>
            </a>
            <a href="https://github.com/arnavpisces" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-github fa-2x"></i>
            </a>
            <a href="mailto:arnavpisces@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fas fa-envelope fa-2x"></i>
            </a>
          </div>
        <hr className="border-gray-500 my-5 w-1/4 mx-auto" />

        <SubscribeForm />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`