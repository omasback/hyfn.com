import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import { ImageAndTextProps } from 'components/display/ImageAndText'
import { ImagesAndTextProps } from 'components/display/ImagesAndText'
import { bleedRight, largeParagraph, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import contentfulContentTypeComponentMap from '../contentfulContentTypeComponentMap'

const useStyles = makeStyles(
  {
    root: {
      extend: responsiveLengths('marginBottom', 120, 150),
    },
    headerText: {
      alignContent: 'flex-start',
    },
    headline: {
      extend: responsiveLengths([
        ['marginTop', 0, 40],
        ['marginBottom', 30, 20],
      ]),
    },
    description: {
      extend: merge(
        largeParagraph(),
        responsiveLengths('marginBottom', 30, 20)
      ),
    },
    bleedRight: {
      extend: bleedRight,
    },
    image: {
      display: 'block',
      width: '100%',
    },
  },
  { name: 'CaseStudy' }
)

const CaseStudy: React.FunctionComponent<CaseStudyPage> = props => {
  const classes = useStyles(props)
  const { contentfulCaseStudy } = props.data

  return (
    <>
      <Container className={classes.root}>
        <Grid container>
          <Grid
            container
            item
            mobile={10}
            desktop={5}
            className={classes.headerText}
          >
            <Grid item className={classes.headline} mobile={10}>
              <OffsetHeadline text={contentfulCaseStudy.pageTitle} />
            </Grid>
            <Grid item mobile={8} desktop={8}>
              <ScrollReveal className={classes.description}>
                {contentfulCaseStudy.linkSummary}
              </ScrollReveal>
            </Grid>
          </Grid>
          <Grid item mobile={8} desktop={4.5}>
            <div className={classes.bleedRight}>
              <ScrollReveal>
                <ColorTrails>
                  <img
                    src={contentfulCaseStudy.linkImage.file.url}
                    alt=""
                    className={cx(classes.image)}
                  />
                </ColorTrails>
              </ScrollReveal>
            </div>
          </Grid>
        </Grid>
      </Container>

      {contentfulCaseStudy.pageSections &&
        contentfulCaseStudy.pageSections.map(ps => {
          if (
            !ps ||
            !ps.internal ||
            !ps.internal.type ||
            !contentfulContentTypeComponentMap[ps.internal.type]
          ) {
            return null
          }
          return React.createElement(
            contentfulContentTypeComponentMap[ps.internal.type],
            {
              ...ps,
              key: ps.id,
            }
          )
        })}
    </>
  )
}

export default CaseStudy

interface CaseStudyPage {
  data: {
    contentfulCaseStudy: {
      linkSummary: string
      linkTextColor: string
      linkTitle: string
      slug: string
      linkBackgroundColor: string
      linkImage: {
        file: {
          url: string
        }
      }
      pageTitle: string
      pageSections: Array<ImageAndTextProps | ImagesAndTextProps | null>
    }
  }
}

export const pageQuery = graphql`
  query CaseStudyBySlug($slug: String!) {
    contentfulCaseStudy(slug: { eq: $slug }) {
      linkSummary
      linkTextColor
      linkTitle
      slug
      linkBackgroundColor
      linkImage {
        file {
          url
        }
      }
      pageTitle
      pageSections {
        ... on ContentfulPageSectionImageAndText {
          ...ImageAndTextFragment
        }
        ... on ContentfulPageSectionImagesAndText {
          id
          internal {
            type
          }
          leftImage {
            file {
              url
            }
          }
          rightImage {
            file {
              url
            }
          }
          text {
            json
          }
        }
        ... on ContentfulPageSectionTextAndText {
          ...TextAndTextFragment
        }
        ... on ContentfulPageSectionMedia {
          ...MediaFragment
        }
      }
    }
  }
`
