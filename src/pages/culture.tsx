import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import { bleedRight, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import AboutPeople from 'components/pages/about/AboutPeople'
import AboutTestimonials, {
  Testimonial,
} from 'components/pages/about/AboutTestimonials'
import AboutPlay, {
  IAboutPlay,
  IPlayProps,
} from 'components/pages/about/AboutPlay'
import { Person } from 'components/pages/about/AboutPerson'
import ImageAndText, {
  ImageAndTextProps,
} from 'components/display/ImageAndText'
import ThemeSetter from 'components/display/ThemeSetter'
import constants from 'styles/constants'

const useStyles = makeStyles(
  {
    headline: {
      extend: responsiveLengths('marginTop', 0, 40),
    },
    subheadline: {
      extend: responsiveLengths('fontSize', 21, 38),
      fontWeight: 'bold',
      marginBottom: '0.8em',
    },
    bleedRight: {
      extend: bleedRight(),
    },
    image: {
      display: 'block',
      width: '100%',
    },
  },
  { name: 'Mui-Culture' }
)

const Culture: React.FunctionComponent<ICulturePageProps> = props => {
  const classes = useStyles(props)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Culture | HYFN</title>
        <link rel="canonical" href="https://hyfn.com/culture/" />
        <meta
          name="description"
          content={props.data.contentfulCulturePage.metaDescription}
        />
      </Helmet>
      <Container>
        <ThemeSetter
          color={constants.colors.darkGray}
          backgroundColor={constants.colors.lightGray}
          parent={'Culture'}
        />
        <Grid container>
          <Grid item className={classes.headline} mobile={10}>
            <OffsetHeadline text={props.data.contentfulCulturePage.headline} />
          </Grid>
        </Grid>
      </Container>
      <ImageAndText
        {...props.data.contentfulCulturePage.topImageAndText}
        colorTrails={true}
      />
      <AboutPeople people={props.data.allContentfulPerson.edges} />
      <ImageAndText
        {...props.data.contentfulCulturePage.nexstarImageAndText}
        colorTrails={true}
      />
      <AboutTestimonials
        testimonials={props.data.allContentfulTestimonial.edges}
      />
      {/* <AboutPlay data={props.data.contentfulPlay} /> */}
    </>
  )
}

export default Culture

interface ICulturePageProps {
  data: {
    contentfulCulturePage: {
      headline: string
      nexstarImageAndText: ImageAndTextProps
      topImageAndText: ImageAndTextProps
      metaDescription: string
    }
    allContentfulPerson: {
      edges: Person[]
    }
    allContentfulTestimonial: {
      edges: Testimonial[]
    }
    contentfulPlay: IPlayProps
  }
}

export const pageQuery = graphql`
  query About {
    contentfulCulturePage(slug: { eq: "culture" }) {
      headline
      nexstarImageAndText {
        ...ImageAndTextFragment
      }
      topImageAndText {
        ...ImageAndTextFragment
      }
      metaDescription
    }
    allContentfulPerson {
      edges {
        node {
          id
          jobTitle
          name
          image {
            file {
              url
            }
          }
          hoverImage {
            file {
              url
            }
          }
        }
      }
    }
    allContentfulTestimonial {
      edges {
        node {
          backgroundColor
          companyLogo {
            file {
              url
            }
          }
          personName
          personTitle
          quote
          textColor
          id
        }
      }
    }
    contentfulPlay(slug: { eq: "play" }) {
      media {
        id
        file {
          url
          contentType
        }
      }
      title
      description
    }
  }
`
