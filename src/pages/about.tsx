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
import { Person } from 'components/pages/about/AboutPerson'

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
  },
  { name: 'About' }
)

const About: React.FunctionComponent<AboutPeopleProps> = props => {
  const classes = useStyles()

  return (
    <>
      <Container className={classes.root}>
        <Grid container className={classes.row1}>
          <Grid container item mobile={10}>
            <Grid item mobile={8} desktop={5}>
              <p className={classes.introP}>
                If finding the perfect agency was like a game of Where’s Waldo,
                we’d be the ones in the red and white stripes.
              </p>
            </Grid>
          </Grid>
          <Grid container item mobile={10} desktop={5}>
            <Grid item className={classes.headline} mobile={10}>
              <OffsetHeadline line1="CULTURE" />
            </Grid>
            <Grid item mobile={8} desktop={6}>
              <ScrollReveal className={classes.subheadline}>
                It’s more than just a buzz word to us.
              </ScrollReveal>
              <ScrollReveal>
                <p>
                  It’s more than letting dogs roam the office or pulling out a
                  beer cart on Fridays. (Although we do both of those things.)
                  Culture at HYFN means coming to work ready to work. It means
                  staying late, not because you were told to but because the
                  outcomes would be better if you did. We’re fueled by a diverse
                  group of genuine, hungry individuals who support and inspire
                  and challenge. Not to be biased, but we’re a rare breed.
                </p>
              </ScrollReveal>
            </Grid>
          </Grid>
          <Grid item mobile={8} desktop={4.5}>
            <div className={classes.bleedRight}>
              <ScrollReveal>
                <ColorTrails>
                  <img
                    src="http://via.placeholder.com/663x877"
                    alt=""
                    className={cx(classes.image)}
                  />
                </ColorTrails>
              </ScrollReveal>
            </div>
          </Grid>
        </Grid>
      </Container>
      <AboutPeople people={props.data.allContentfulPerson.edges} />
    </>
  )
}

export default About

interface AboutPeopleProps {
  data: {
    allContentfulPerson: {
      edges: Person[]
    }
  }
}

export const pageQuery = graphql`
  query About {
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
  }
`
