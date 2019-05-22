import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { RouteComponentProps, matchPath } from 'react-router-dom'

import OdometerText from 'components/display/OdometerText'
import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import ImageAndText from 'components/display/ImageAndText'
import ImagesAndText from 'components/display/ImagesAndText'
import theme from 'styles/theme'
import { bleedRight } from 'styles/mixins'
import { responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'

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
    headline: {
      marginBottom: '8.9vw',
      [theme.mq.desktop]: {
        marginBottom: 0,
      },
    },
    subheadline: {
      extend: responsiveLengths('fontSize', 21, 38),
      fontWeight: 'bold',
      marginBottom: '0.8em',
      [theme.mq.desktop]: {
        marginTop: '2.4em',
      },
    },
    bleedRight: {
      extend: bleedRight,
    },
    image: {
      display: 'block',
      width: '100%',
    },
    largerCopy: {
      extend: responsiveLengths('fontSize', 17, 28),
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'CaseStudy' }
)

interface Props extends RouteComponentProps<RouteParams> {}

interface RouteParams {
  slug: string
}

const CaseStudy: React.FunctionComponent<Props> = ({ match, children }) => {
  const classes = useStyles()

  return (
    <>
      <Container className={classes.root}>
        <Grid container className={classes.row1}>
          <Grid container item mobile={10} desktop={5}>
            <Grid item className={classes.headline} mobile={10}>
              <OffsetHeadline line1="OMD" line2="BUZZED" />
            </Grid>
            <Grid item mobile={8} desktop={6}>
              <ScrollReveal className={classes.subheadline}>
                They Said
              </ScrollReveal>
              <ScrollReveal>
                <p>
                  Everyone knows drunk driving is bad, but a lot of people still
                  think it’s okay to drive buzzed. We want to create a memorable
                  campaign that starts a conversation around preventing buzzed
                  driving.
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

      <ImageAndText imageUrl={'http://via.placeholder.com/676x440'}>
        <>
          <h3>We Said</h3>
          <p>
            What if people are driving buzzed because they don’t even realize
            they’re buzzed? What if we refocus the conversation on knowing when
            you’re buzzed and therefore shouldn’t be driving?
          </p>
        </>
      </ImageAndText>

      <ImageAndText rowReverse imageUrl={'http://via.placeholder.com/676x440'}>
        <p>
          But before we can give you those answers, we need to know a little
          more about you, your brand, and your expectations.
        </p>
        <p>
          Then comes the good stuff. The part where we make your business our
          business. Where your goals become our challenges, and our solutions
          become your game changers.
        </p>
      </ImageAndText>

      <img
        src="http://via.placeholder.com/1440x670"
        alt=""
        className={classes.image}
      />

      <ImagesAndText
        imageUrl1={'http://via.placeholder.com/440x676'}
        imageUrl2={'http://via.placeholder.com/440x676'}
      >
        <>
          <h3>We Said</h3>
          <p>
            What if people are driving buzzed because they don’t even realize
            they’re buzzed? What if we refocus the conversation on knowing when
            you’re buzzed and therefore shouldn’t be driving?
          </p>
        </>
      </ImagesAndText>

      <img
        src="http://via.placeholder.com/1440x670"
        alt=""
        className={classes.image}
      />

      <ImageAndText imageUrl={'http://via.placeholder.com/709x877'} bleedRight>
        <>
          <h3>Insight #1</h3>
          <p>
            Talking about how you could die is a bit of a downer. Scare tactics
            like this make ads off-putting rather than engagin
          </p>
        </>
      </ImageAndText>

      <ImageAndText
        rowReverse
        imageUrl={'http://via.placeholder.com/709x877'}
        bleedLeft
      >
        <>
          <h3>Insight #2</h3>
          <p>
            Talking about how you could die is a bit of a downer. Scare tactics
            like this make ads off-putting rather than engagin
          </p>
        </>
      </ImageAndText>
    </>
  )
}

export default CaseStudy
