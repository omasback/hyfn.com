import * as React from 'react'
import Nav from './Nav'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
})

const PageWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root} id="outer-container">
      <Nav />
      <main id="page-wrap">{children}</main>
    </div>
  )
}

export default PageWrapper
