import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import Nav from './Nav'
import Footer from './Footer'
import { Theme } from 'layouts'
import constants from 'styles/constants'

const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      padding: 0,
      paddingTop: 1,
      transition: `background-color ${
        constants.themeTransitionDuration
      }, color ${constants.themeTransitionDuration}
      `,
      backgroundColor: theme.backgroundColor,
      color: theme.color,
    },
    content: {
      position: 'relative',
      zIndex: 1,
    },
  }),
  { name: 'PageWrapper' }
)

const PageWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root} id="outer-container">
      <Nav />
      <main id="page-wrap" className={classes.content}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PageWrapper
