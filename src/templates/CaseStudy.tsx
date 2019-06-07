import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import ImageAndText, {
  ImageAndTextProps,
} from 'components/display/ImageAndText'
import ImagesAndText, {
  ImagesAndTextProps,
} from 'components/display/ImagesAndText'
import constants from 'styles/constants'
import { bleedRight, largeParagraph, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import ThemeSetter from 'components/display/ThemeSetter'
import contentfulContentTypeComponentMap from '../contentfulContentTypeComponentMap'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 71, 140),
        responsiveLengths('marginBottom', 116, 150)
      ),
    },
    row1: {
      alignItems: '',
    },
    introP: {
      extend: merge(
        largeParagraph,
        responsiveLengths('marginTop', 63, 108),
        responsiveLengths('marginBottom', 50, 0)
      ),
      marginBottom: 0,
    },
    headline: {
      extend: merge(
        responsiveLengths('marginTop', 0, 40),
        responsiveLengths('marginBottom', 50, 0)
      ),
    },
    subheadline: {
      extend: responsiveLengths('fontSize', 21, 38),
      fontWeight: 'bold',
      marginBottom: '0.8em',
    },
    bleedRight: {
      extend: bleedRight,
    },
    image: {
      display: 'block',
      width: '100%',
    },
    largerCopy: {
      extend: largeParagraph(),
    },
    cta: {
      marginBottom: '4vw',
    },
    chart: {
      extend: responsiveLengths('marginBottom', 60, 180),
      '& p': {
        extend: responsiveLengths('marginBottom', 8, 30),
      },
      '& img': {
        extend: merge(
          responsiveLengths('width', 180, 360),
          responsiveLengths('marginTop', 40, 110)
        ),
        borderRadius: '50%',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        [constants.mq.desktop]: {
          marginLeft: '0',
        },
      },
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
        <Grid container className={classes.row1}>
          <Grid container item mobile={10}>
            <Grid item mobile={8} desktop={5}>
              <p className={classes.introP}>
                {contentfulCaseStudy.linkSummary}
              </p>
            </Grid>
          </Grid>
          <Grid container item mobile={10} desktop={5}>
            <Grid item className={classes.headline} mobile={10}>
              <OffsetHeadline text={contentfulCaseStudy.pageTitle} />
            </Grid>
            <Grid item mobile={8} desktop={6}>
              <ScrollReveal className={classes.subheadline}>
                {documentToReactComponents(
                  contentfulCaseStudy.pageIntroText.json
                )}
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

      <Container>
        <Grid container>
          <Grid item mobile={10} desktop={4} className={classes.chart}>
            <h1>10X</h1>
            <p className={classes.largerCopy}>Return on Ad Spend</p>
            <img src="http://via.placeholder.com/360x360" alt="" />
          </Grid>
          <Grid item mobile={10} desktop={6} className={classes.chart}>
            <h1>$250k</h1>
            <p className={classes.largerCopy}>Total Profit</p>
            <img src="http://via.placeholder.com/360x360" alt="" />
          </Grid>
        </Grid>
      </Container>
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
      pageIntroText: {
        json: any
      }
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
      pageIntroText {
        json
      }
      pageSections {
        ... on ContentfulPageSectionImageAndText {
          id
          imageSide
          text {
            json
          }
          image {
            file {
              url
            }
          }
          internal {
            type
          }
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
        ... on ContentfulPageSectionMedia {
          id
          fullBleed
          internal {
            type
          }
          asset {
            file {
              url
              contentType
            }
          }
        }
      }
    }
  }
`
