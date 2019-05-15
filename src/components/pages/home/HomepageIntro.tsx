import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import OdometerText from 'components/display/OdometerText'
import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import theme from 'styles/theme'
import { responsiveLengths } from 'styles/helpers'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('paddingTop', 71, 440),
        responsiveLengths('paddingBottom', 116, 150)
      ),
      minHeight: '100vh',
    },
    row1: {
      alignItems: '',
    },
    headline: {
      extend: responsiveLengths('fontSize', 70, 180),
      lineHeight: 0.9,
      fontWeight: 'bold',
      marginBottom: '8.9vw',
      [theme.mq.desktop]: {
        marginBottom: 0,
      },
    },
    headlineLine1: {
      extend: responsiveLengths('marginLeft', -52, -194),
    },
    headlineLine2: {},
    subheadline: {
      extend: responsiveLengths('fontSize', 21, 38),
      fontWeight: 'bold',
      marginBottom: '0.8em',
      [theme.mq.desktop]: {
        marginTop: '2.4em',
      },
    },
    image: {
      display: 'block',
      width: '100%',
    },
    row2: {
      extend: merge(
        responsiveLengths('marginTop', 60, 220),
        responsiveLengths('marginBottom', 60, 220)
      ),
      [theme.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
    largerCopy: {
      extend: responsiveLengths('fontSize', 17, 28),
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'HompageIntro' }
)

const HompageIntro: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container className={classes.row1}>
        <Grid container item mobile={10} desktop={5}>
          <Grid item className={classes.headline} mobile={10}>
            <OdometerText text="STILL" className={classes.headlineLine1} />
            <OdometerText text="HERE?" className={classes.headlineLine2} />
          </Grid>
          <Grid item mobile={8} desktop={6} offsetDesktop={2}>
            <ScrollReveal className={classes.subheadline}>
              We should get to know each other.
            </ScrollReveal>
            <ScrollReveal>
              <p>
                Since you’re here, our guess is you’ve got problems. (The
                business kind, not the personal kind.) And as it turns out,
                we’ve got answers. Tons of them.
              </p>
            </ScrollReveal>
          </Grid>
        </Grid>
        <Grid item mobile={8} desktop={4.5}>
          <ScrollReveal>
            <ColorTrails>
              <img
                src="http://via.placeholder.com/510x660"
                alt=""
                className={cx(classes.image)}
              />
            </ColorTrails>
          </ScrollReveal>
        </Grid>
      </Grid>
      <Grid container className={classes.row2} alignItemsDesktop="center">
        <Grid item mobile={8} desktop={3.5}>
          <ScrollReveal>
            <p>
              But before we can give you those answers, we need to know a little
              more about you, your brand, and your expectations.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <p>
              Then comes the good stuff. The part where we make your business
              our business. Where your goals become our challenges, and our
              solutions become your game changers.
            </p>
          </ScrollReveal>
        </Grid>
        <Grid item mobile={10} desktop={6}>
          <ScrollReveal>
            <ColorTrails>
              <img
                src="http://via.placeholder.com/600x400"
                alt=""
                className={classes.image}
              />
            </ColorTrails>
          </ScrollReveal>
        </Grid>
      </Grid>
      <Grid container alignItemsDesktop="center">
        <Grid item mobile={8} desktop={3.5} offsetDesktop={1}>
          <ScrollReveal>
            <p className={classes.largerCopy}>
              So lay it on us. Come with questions. Come confused. Come
              expecting guidance. And don’t come with socks, because they’ll
              definitely get blown off.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <ArrowLink
              to="/"
              text={'Might as well get in touch'}
              className={classes.cta}
            />
          </ScrollReveal>
        </Grid>
        <Grid item mobile={8} desktop={4.5}>
          <ScrollReveal>
            <ColorTrails>
              <img
                src="http://via.placeholder.com/510x660"
                alt=""
                className={classes.image}
              />
            </ColorTrails>
          </ScrollReveal>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HompageIntro
