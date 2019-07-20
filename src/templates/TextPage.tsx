import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Container from 'components/display/Container'
import { largeParagraph, responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles(
  {
    root: {},
    headline: {
      extend: responsiveLengths([
        ['fontSize', 40, 100],
        ['marginBottom', 30, 70],
      ]),
    },
    subheadline: {
      extend: merge(
        largeParagraph(),
        responsiveLengths('marginBottom', 30, 70)
      ),
    },
    bodyText: {
      maxWidth: 800,
    },
  },
  { name: 'Mui-TextPage' }
)

const TextPage: React.FunctionComponent<ITextPageProps> = props => {
  const classes = useStyles(props)
  const cms = props.data.contentfulTextPage

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{cms.headline} | HYFN</title>
        <link rel="canonical" href={`https://hyfn.com/${cms.slug}/`} />
        <meta name="description" content={cms.subheadline} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container className={classes.root}>
        {cms.headline && <h1 className={classes.headline}>{cms.headline}</h1>}
        {cms.subheadline && (
          <p className={classes.subheadline}>{cms.subheadline}</p>
        )}
        {cms.bodyText && (
          <div className={classes.bodyText}>
            {documentToReactComponents(cms.bodyText.json)}
          </div>
        )}
      </Container>
    </>
  )
}

export default TextPage

interface ITextPageProps {
  data: {
    contentfulTextPage: {
      id: string
      slug: string
      headline: string
      subheadline: string
      bodyText: {
        json: any
      }
    }
  }
}

export const pageQuery = graphql`
  query TextPageBySlug($slug: String!) {
    contentfulTextPage(slug: { eq: $slug }) {
      id
      slug
      headline
      subheadline
      bodyText {
        json
      }
    }
  }
`
