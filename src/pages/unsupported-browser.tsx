import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/display/Container'
import { FaChrome, FaFirefox } from 'react-icons/fa'
import constants from 'styles/constants'

const useStyles = makeStyles(
  {
    root: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      '& h2': {
        marginBottom: 40,
        width: '100%',
      },
    },
    links: {
      display: 'flex',
      '& a': {
        textDecoration: 'none',
        margin: 40,
        color: constants.colors.darkGray,
      },
      '& svg': {
        width: 100,
        height: 100,
      },
    },
  },
  { name: 'UnsupportedBrowser' }
)

interface Props {}

const UnsupportedBrowser: React.FunctionComponent<Props> = props => {
  const classes = useStyles(props)

  return (
    <Container className={classes.root}>
      <h2>Sorry! This website won't work your browser.</h2>
      <p>
        For the best viewing experience, download a more modern browser below.
      </p>
      <div className={classes.links}>
        <a
          href="https://www.google.com/intl/en_US/chrome/browser/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaChrome />
          <p>Chrome</p>
        </a>
        <a
          href="http://www.mozilla.org/en-US/firefox/new/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFirefox />
          <p>Firefox</p>
        </a>
      </div>
    </Container>
  )
}

export default UnsupportedBrowser
