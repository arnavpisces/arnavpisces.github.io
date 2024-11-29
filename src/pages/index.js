import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import SubscribeForm from '../components/SubscribeForm'

export default function HomePage({ data }) {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <div className="mx-auto px-4 py-8" style={{ maxWidth: '52rem' }}>
        <header className="text-center mb-16">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full overflow-hidden border border-gray-700">
            <img 
              src="/images/arnav-kumar.jpeg"
              alt="Arnav Kumar"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-base mb-4 tracking-widest text-gray-400">ARNAV  KUMAR</h1>
          <p className="text-gray-400 mb-2 text-lg">
            Software Engineer specialized in platform and cloud-native architectures. Previously at <a href="https://zeta.tech/" target='_blank' rel="noreferrer" className="underline">Zeta</a>, 
            <a href="https://rippling.com/" target='_blank' rel="noreferrer" className="underline"> Rippling</a>, 
            and <a href="https://quandlelabs.com/" target='_blank' rel="noreferrer" className="underline"> Quandle Labs</a>, building scalable infrastructure and driving efficiency in developer workflows. Currently experimenting with <a href="https://en.wikipedia.org/wiki/High-frequency_trading" target="_blank" rel='noreferrer'className='underline'>HFT</a> systems.
          </p>
          
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
        </header>

        <main>
          {posts.map(({ node }) => (
            <article 
              key={node.id} 
              className="mb-12 p-6 rounded-lg border border-gray-600 w-full max-w-3xl shadow-lg" 
              style={{ backgroundColor: '#1A2733', borderWidth: '1px' }} 
            >
              <Link to={node.fields.slug}>
                <div className="transition text-center">
                  <time className="text-gray-400 text-sm">
                    {node.frontmatter.date}
                  </time>
                  <h2 className="text-3xl font-bold text-white mt-0">
                    {node.frontmatter.title}
                  </h2>
                  <p className="text-gray-300 mt-4 text-left text-lg">
                    {node.excerpt}
                  </p>
                  <span className="inline-block mt-4 text-gray-400 hover:text-white border border-gray-600 rounded-full px-3 py-1">
                    Read more
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
