import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import { ImageAndTextProps } from 'components/display/ImageAndText'
import { ImagesAndTextProps } from 'components/display/ImagesAndText'
import { bleedRight, largeParagraph, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import contentfulContentTypeComponentMap from '../contentfulContentTypeComponentMap'
import Img from 'components/display/Img'
import { ITextAndTextProps } from 'components/display/TextAndText'
import { IPageSectionMediaProps } from 'components/display/PageSectionMedia'
import ThemeSetter from 'components/display/ThemeSetter'
import constants from 'styles/constants'

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
  { name: 'Mui-CaseStudy' }
)

const CaseStudy: React.FunctionComponent<CaseStudyPage> = props => {
  const classes = useStyles(props)
  const { contentfulCaseStudy } = props.data

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{contentfulCaseStudy.linkTitle} | HYFN</title>
        <link
          rel="canonical"
          href={`https://hyfn.com/work/${props.pageContext.slug}/`}
        />
        <meta
          name="description"
          content={contentfulCaseStudy.metaDescription}
        />
        {contentfulCaseStudy.noindex && (
          <meta name="robots" content="noindex" />
        )}
      </Helmet>
      <Container className={classes.root}>
        <ThemeSetter
          color={constants.colors.darkGray}
          backgroundColor={constants.colors.lightGray}
          parent={'Culture'}
        />
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
                <Img
                  src={contentfulCaseStudy.linkImage.file.url}
                  alt=""
                  className={cx(classes.image)}
                />
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
              colorTrails: false,
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
      pageSections: Array<
        | ImageAndTextProps
        | ImagesAndTextProps
        | ITextAndTextProps
        | IPageSectionMediaProps
        | null
      >
      noindex: boolean
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
      metaDescription
      noindex
      pageSections {
        ... on ContentfulPageSectionImageAndText {
          ...ImageAndTextFragment
        }
        ... on ContentfulPageSectionImagesAndText {
          ...ImagesAndTextFragment
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
