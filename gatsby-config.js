const path = require('path')

let contentfulConfig

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

// Overwrite the Contentful config with environment variables if they exist
contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken:
    process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.accessToken,
}

// if (process.env.NODE_ENV === 'development') {
//   contentfulConfig.host = 'preview.contentful.com'
// }

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    name: 'Hello Typescript World!',
    tagline: 'Gatsby + Typescript = 💪',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-tslint',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        layouts: path.join(__dirname, 'src/layouts'),
        templates: path.join(__dirname, 'src/templates'),
        images: path.join(__dirname, 'src/images'),
        fonts: path.join(__dirname, 'src/fonts'),
        styles: path.join(__dirname, 'src/styles'),
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
    'gatsby-plugin-layout',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        // disableAutoprefixing: true,
        // disableMinification: true,
      },
    },
  ],
}
