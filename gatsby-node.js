const path = require('path')

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const caseStudyTemplate = path.resolve(`src/templates/CaseStudy.tsx`)
    resolve(
      graphql(
        `
          {
            allContentfulCaseStudy {
              edges {
                node {
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allContentfulCaseStudy.edges.forEach(({ node }) => {
          const slug = node.slug
          createPage({
            path: `work/${slug}/`,
            component: caseStudyTemplate,
            context: {
              slug,
            },
          })
        })
      })
    )
  })
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions
  if (page.path.match(/unsupported-browser/)) {
    page.context.layout = 'noNav'
    createPage(page)
  }
}
