import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import { OdometerText } from 'components/display/OdometerText'
import { ArrowLink } from 'components/display/ArrowLink'
import { Container } from 'components/display/Container'
import { Grid } from 'components/display/Grid'
import theme from 'styles/theme'

const useStyles = makeStyles(
  {
    root: {
      paddingTop: '72px',
      paddingBottom: '17vw',
      minHeight: '100vh',
    },
    headline: {
      fontSize: '19vw',
      lineHeight: 0.9,
      fontWeight: 'bold',
      marginBottom: '8vw',
      [theme.mq.desktop]: {
        fontSize: '180px',
        marginBottom: 0,
      },
    },
    headlineLine1: {
      marginLeft: '-0.75em',
    },
    headlineLine2: {},
    subheadline: {
      fontWeight: 'bold',
      fontSize: '5.5vw',
      marginBottom: '0.8em',
      [theme.mq.desktop]: {
        fontSize: 38,
      },
    },
    copy: {},
    image: {
      display: 'block',
      width: '100%',
    },
    row2: {
      marginTop: '10vw',
      marginBottom: '10vw',
      [theme.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
  },
  { name: 'HompageIntro' }
)

const HompageIntro: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid container item mobile={10} desktop={5}>
          <Grid item className={classes.headline} mobile={10}>
            <OdometerText text="STILL" className={classes.headlineLine1} />
            <OdometerText text="HERE?" className={classes.headlineLine2} />
          </Grid>
          <Grid item mobile={8} desktop={8}>
            <div className={classes.subheadline}>
              We should get to know each other.
            </div>
            <p className={classes.copy}>
              Since you’re here, our guess is you’ve got problems. (The business
              kind, not the personal kind.) And as it turns out, we’ve got
              answers. Tons of them.
            </p>
          </Grid>
        </Grid>
        <Grid item mobile={8} desktop={4.5}>
          <img
            src="http://via.placeholder.com/510x660"
            alt=""
            className={classes.image}
          />
        </Grid>
      </Grid>
      <Grid container className={classes.row2}>
        <Grid item mobile={8} desktop={3.5}>
          <p className={classes.copy}>
            But before we can give you those answers, we need to know a little
            more about you, your brand, and your expectations.
          </p>
          <p className={classes.copy}>
            Then comes the good stuff. The part where we make your business our
            business. Where your goals become our challenges, and our solutions
            become your game changers.
          </p>
        </Grid>
        <Grid item mobile={10} desktop={6}>
          <img
            src="http://via.placeholder.com/600x400"
            alt=""
            className={classes.image}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item mobile={8} desktop={3.5}>
          <p>
            So lay it on us. Come with questions. Come confused. Come expecting
            guidance. And don’t come with socks, because they’ll definitely get
            blown off.
          </p>
          <ArrowLink to="/" text={'Might as well get in touch'} />
        </Grid>
        <Grid item mobile={8} desktop={4.5}>
          <img
            src="http://via.placeholder.com/510x660"
            alt=""
            className={classes.image}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default HompageIntro
