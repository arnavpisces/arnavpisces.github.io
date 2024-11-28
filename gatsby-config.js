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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-NQJDZ9LFBR", // Replace with your actual tracking ID
        head: true, // Puts tracking script in the head instead of the body
        anonymize: true, // Anonymize IPs for GDPR compliance
        respectDNT: true, // Respects "Do Not Track" settings in users' browsers
        pageTransitionDelay: 0, // Delay in milliseconds for page transitions
        enableWebVitalsTracking: true, // Tracks Web Vitals (Core Web Vitals metrics)
      },
    }
  ],
}