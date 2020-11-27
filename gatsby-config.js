module.exports = {
  siteMetadata: {
    title: `Blog de 73Nko`,
    author: `Álex Pérez`,
    description: `Blog sobre programación web, javascript, node, react, etc...`,
    siteUrl: `https://www.73nko.es`,
    social: {
      github: `73nko`,
      twitter: `73nko`,
      linkedin: `alejandroperezramos`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: 'UA-111429526-2',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              backgroundColor: `transparent`,
              withWebp: true,
              showCaptions: true,
              quality: 80,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-code-titles`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          {
            resolve: `@weknow/gatsby-remark-twitter`,
            options: {
              align: `center`,
            },
          },
          `gatsby-remark-external-links`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-135472857-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `73nko.es`,
        short_name: `73nko.es`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#0d8044`,
        display: `minimal-ui`,
        icon: `content/assets/logo-73.svg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: { logo: './static/favicon.png' },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        typekit: { id: `ldl2nlv` },
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-webpack-bundle-analyzer`,
    `gatsby-plugin-netlify-cache`,
    `gatsby-plugin-preload-fonts`,
    `gatsby-plugin-no-javascript`,
    `gatsby-plugin-netlify`, // must be last
  ],
};
