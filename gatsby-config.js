module.exports = {
  siteMetadata: {
    title: 'Arnav Kumar',
    description: 'i just need a place to write',
    author: '@arnavpisces',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-NQJDZ9LFBR", // Google Analytics / GA
        ],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: true
        },
      },
    },
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
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Arnav Kumar',
        short_name: 'Arnav',
        start_url: '/',
        background_color: '#1A2733',
        theme_color: '#1A2733',
        display: 'minimal-ui',
        icon: 'src/images/cowboy.png', // Path to your favicon
      },
    },
    {
      resolve: 'gatsby-plugin-clarity',
      options: {
        clarity_project_id: 'pb8erhjgc2',
        enable_on_dev_env: true
      },
    },
  ],
}