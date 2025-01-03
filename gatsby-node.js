const { createFilePath } = require('gatsby-source-filesystem')
const path = require('path')
const fs = require('fs')
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode, basePath: 'posts' })
    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

 result.data.allMarkdownRemark.edges.forEach(({ node }) => {
   createPage({
     path: node.fields.slug,
     component: path.resolve('./src/templates/blog-post.js'),
     context: {
       // Data passed to context is available
       // in page queries as GraphQL variables.
       slug: node.fields.slug,
     },
   })
 })
}
exports.onPostBuild = () => {
  fs.copyFileSync(
    path.join(__dirname, 'CNAME'),
    path.join(__dirname, 'public', 'CNAME')
  );
};