const path = require('path')

module.exports = {
  siteMetadata: {
    name: 'Hello Typescript World!',
    tagline: 'Gatsby + Typescript = 💪',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-tslint',
    'gatsby-plugin-layout',
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
  ],
}
