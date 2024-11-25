module.exports = {
  siteMetadata: {
    title: 'Arnav Kumar',
    description: 'i just need a place to write',
    author: '@arnavpisces',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
              escapeEntities: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://gmail.us20.list-manage.com/subscribe/post?u=23d672bbce5cd548b0c23208b&id=c5e4440d15',
      },
    }
  ],
}