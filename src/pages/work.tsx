import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'
import { Helmet } from 'react-helmet'

import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import OffsetHeadline from 'components/display/OffsetHeadline'
import CaseStudyLink, {
  ICaseStudyLink,
} from 'components/pages/case-studies/CaseStudyLink'
import { responsiveLengths, largeParagraph } from 'styles/mixins'
import Grid from 'components/display/Grid'
import ThemeSetter from 'components/display/ThemeSetter'
import { graphql } from 'gatsby'

const useStyles = makeStyles(
  {
    root: {},
    top: {
      position: 'relative',
    },
    introText: {
      extend: largeParagraph(),
    },
    headline: {},
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'CaseStudiesIndex' }
)

const CaseStudiesIndex: React.FunctionComponent<CaseStudiesProps> = props => {
  const classes = useStyles()

  const { contentfulWorksPage } = props.data
  const cms = contentfulWorksPage

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Work | HYFN</title>
        <link rel="canonical" href="https://hyfn.com/work/" />
        <meta name="description" content={cms.metaDescription} />
        
      </Helmet>
      <Container className={classes.root}>
        <Grid container className={classes.top}>
          <ThemeSetter parent="CaseStudiesIndex" />
          {/* <Grid item mobile={8} desktop={6} className={classes.introText}>
          <ScrollReveal>{contentfulWorksPage.description}</ScrollReveal>
        </Grid> */}

          <Grid item mobile={10}>
            <OffsetHeadline
              text={contentfulWorksPage.title}
              className={classes.headline}
            />
          </Grid>
        </Grid>
        {contentfulWorksPage.caseStudyLinks.map((work, i) => (
          <CaseStudyLink
            key={work.slug}
            title={work.linkTitle}
            image={work.linkImage.file.url}
            description={work.linkSummary}
            url={`work/${work.slug}/`}
            color={work.linkTextColor}
            backgroundColor={work.linkBackgroundColor}
            number={i}
            rowReverse={!!(i % 2)}
          />
        ))}
      </Container>
    </>
  )
}

export default CaseStudiesIndex

interface CaseStudiesProps {
  data: {
    contentfulWorksPage: {
      id: string
      title: string
      description: string
      metaDescription: string
      caseStudyLinks: ICaseStudyLink[]
    }
  }
}

export const pageQuery = graphql`
  query CaseStudiesQuery {
    contentfulWorksPage(slug: { eq: "work" }) {
      id
      title
      description
      metaDescription
      caseStudyLinks {
        slug
        linkTitle
        linkTextColor
        linkSummary
        linkBackgroundColor
        linkImage {
          file {
            url
          }
        }
      }
    }
  }
`
