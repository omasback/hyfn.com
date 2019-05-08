import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    padding: 0,
  },
})

const Footer: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return <div className={classes.root}>{children}</div>
}

export default Footer
