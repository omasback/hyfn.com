import * as React from 'react'
import { createStylesHook } from 'helpers/createStylesHook'
import Nav from './Nav'

const useStyles = createStylesHook({
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
