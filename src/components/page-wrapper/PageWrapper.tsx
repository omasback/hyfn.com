import * as React from 'react'
import Nav from './Nav'
import { makeStyles } from '@material-ui/styles'

import Footer from './Footer'
import { Theme } from 'components/App'

const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      padding: 0,
      transition: 'background-color 0.5s',
      backgroundColor: theme.backgroundColor,
      color: theme.color,
    },
  }),
  { name: 'PageWrapper' }
)

const PageWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root} id="outer-container">
      <Nav />
      <main id="page-wrap">{children}</main>
      <Footer />
    </div>
  )
}

export default PageWrapper
