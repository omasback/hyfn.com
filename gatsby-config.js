const path = require('path')

let contentfulConfig = {}

try {
  // Load the Contentful config from the .contentful.json
  contentfulConfig = require('./.contentful')
} catch (_) {}

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const deliveryToken =
  process.env.CONTENTFUL_DELIVERY_TOKEN || contentfulConfig.deliveryToken
const previewToken =
  process.env.CONTENTFUL_PREVIEW_TOKEN || contentfulConfig.previewToken
const usePreview =
  (process.env.CONTENTFUL_USE_PREVIEW || contentfulConfig.usePreview) === 'true'

contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || contentfulConfig.spaceId,
  accessToken: usePreview ? previewToken : deliveryToken,
  host: usePreview ? 'preview.contentful.com' : undefined,
}

const { spaceId, accessToken } = contentfulConfig

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and the delivery token need to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    name: 'hyfn.com',
    tagline: 'hyfn.com',
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
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GOOTLE_TAG_MANAGER_ID,

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIROMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },
    'gatsby-plugin-react-helmet',
  ],
}
