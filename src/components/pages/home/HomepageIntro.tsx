import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import constants from 'styles/constants'
import { responsiveLengths, largeParagraph } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import Slideshow from 'components/display/Slideshow'
import { IHomepageData } from 'pages'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('paddingTop', 71, 140),
        responsiveLengths('paddingBottom', 116, 150)
      ),
      minHeight: '100vh',
    },
    row1: {
      alignItems: '',
    },
    headline: {
      marginBottom: '8.9vw',
      [constants.mq.desktop]: {
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
      [constants.mq.desktop]: {
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
      [constants.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
    largerCopy: {
      extend: largeParagraph(),
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'Mui-HompageIntro' }
)

interface IProps {
  cms: IHomepageData
}

const HompageIntro: React.FunctionComponent<IProps> = ({ cms }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container className={classes.row1}>
        <Grid container item mobile={10} desktop={5}>
          <Grid item className={classes.headline} mobile={10}>
            <OffsetHeadline text="STILL\nHERE?" />
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
              <Slideshow slides={cms.slideshow1} aspectRatio={0.75} />
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
              <Slideshow slides={cms.slideshow2} aspectRatio={1.5} />
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
              to="/contact/"
              text={'Might as well get in touch'}
              className={classes.cta}
            />
          </ScrollReveal>
        </Grid>
        <Grid item mobile={8} desktop={4.5}>
          <ScrollReveal>
            <ColorTrails>
              <Slideshow slides={cms.slideshow3} aspectRatio={0.75} />
            </ColorTrails>
          </ScrollReveal>
        </Grid>
      </Grid>
    </Container>
  )
}

export default HompageIntro
