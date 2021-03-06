import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import Nav from './Nav'
import Footer from './Footer'
import PageTransition from './PageTransition'
import { Theme } from 'layouts'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      padding: 0,
      paddingTop: 1,
      transition: `all ${constants.themeTransitionDuration}`,
      backgroundColor: theme.backgroundColor,
      color: theme.color,
    },
    content: {
      extend: responsiveLengths([['paddingBottom', 120, 150]]),
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
      paddingTop: 120,
      [constants.mq.desktop]: {
        paddingTop: 250,
      },
    },
  }),
  { name: 'Mui-PageWrapper' }
)

const PageWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Nav />
      <PageTransition>
        <main className={classes.content}>{children}</main>
      </PageTransition>
      <Footer />
    </div>
  )
}

export default PageWrapper
