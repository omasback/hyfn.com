import * as React from 'react'
import { createStylesHook } from '../../helpers/createStylesHook'

const useStyles = createStylesHook({
  root: {
    padding: 0,
  },
})

const Footer: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default Footer
