import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'
import { Helmet } from 'react-helmet'

import Container from 'components/display/Container'
import { largeParagraph, responsiveLengths } from 'styles/mixins'
import Grid from 'components/display/Grid'
import constants from 'styles/constants'

const useStyles = makeStyles(
  {
    root: {},
    headline: {
      extend: responsiveLengths([
        ['fontSize', 40, 100],
        ['marginBottom', 30, 70],
      ]),
    },
    subheadline: {
      extend: merge(
        largeParagraph(),
        responsiveLengths('marginBottom', 30, 70)
      ),
    },
    links: {},
    link: {
      extend: responsiveLengths('fontSize', 14, 18),
      display: 'inline-block',
      fontWeight: 'bold',
      textDecoration: 'none',
      borderBottom: `2px solid ${constants.colors.darkGray}`,
      paddingBottom: 3,
      marginRight: '2em',
    },
    arrow: {
      transform: 'translateX(16%) rotate(-45deg)',
      display: 'inline-block',
    },
  },
  { name: 'ThankYouPage' }
)

const ThankYouPage: React.FunctionComponent<{}> = props => {
  const classes = useStyles(props)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Thank You | HYFN</title>
        <link rel="canonical" href={`https://hyfn.com/thank-you/`} />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container className={classes.root}>
        <Grid container>
          <Grid item mobile={10} desktop={5}>
            <h1 className={classes.headline}>Thank You!</h1>
            <p className={classes.subheadline}>
              We’ll be in touch. While we’re working on our response to your
              message, feel free to check out our social media.
            </p>
            <div className={classes.links}>
              {[
                {
                  href: 'https://www.facebook.com/WeAreHYFN/',
                  text: 'Facebook',
                },
                {
                  href: 'https://www.instagram.com/wearehyfn/',
                  text: 'Instagram',
                },
              ].map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  className={classes.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.text} <span className={classes.arrow}>-></span>
                </a>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default ThankYouPage
