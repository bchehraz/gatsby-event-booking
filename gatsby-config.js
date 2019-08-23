module.exports = {
  siteMetadata: {
    title: `Simple Event App`,
    description: `Simple event/booking with authentication with GraphQL Backend and MongoDB`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false
        }
      }
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Events`,
        short_name: `GatsbyEvents`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/icon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    //enables PWA Offline functionality
    `gatsby-plugin-offline`,
  ],
}
