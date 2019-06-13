import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import { bleedRight, largeParagraph, responsiveLengths } from 'styles/mixins'
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
        responsiveLengths('marginTop', 63, 108),
        responsiveLengths('marginBottom', 50, 0),
        largeParagraph()
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
      extend: bleedRight(),
    },
    image: {
      display: 'block',
      width: '100%',
    },
  },
  { name: 'Culture' }
)

const Culture: React.FunctionComponent<ICulturePageProps> = props => {
  const classes = useStyles({})

  return (
    <>
      <Container className={classes.root}>
        <Grid container className={classes.row1}>
          <Grid item className={classes.headline} mobile={10}>
            <OffsetHeadline text={props.data.contentfulCulturePage.headline} />
          </Grid>
        </Grid>
      </Container>
      <ImageAndText {...props.data.contentfulCulturePage.topImageAndText} />
      <AboutPeople people={props.data.allContentfulPerson.edges} />
      <ImageAndText {...props.data.contentfulCulturePage.nexstarImageAndText} />
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
      headline
      nexstarImageAndText: ImageAndTextProps
      topImageAndText: ImageAndTextProps
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
