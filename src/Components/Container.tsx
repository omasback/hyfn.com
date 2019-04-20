import * as React from 'react'
import { createStylesHook } from '../helpers/createStylesHook'

const useStyles = createStylesHook(
  {
    root: {
      margin: '0 auto',
      padding: '0 40px',
      maxWidth: 1286,
    },
    inner: {},
  },
  { name: 'Container' }
)

const Container: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.inner}>{children}</div>
    </div>
  )
}

export default Container
