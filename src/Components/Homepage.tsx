import * as React from 'react'
import withStyles, { WithStyles } from 'react-jss'
import theme from 'styles/theme'

interface Props extends WithStyles<typeof styles> {}

const Homepage: React.FunctionComponent<Props> = ({ classes }) => (
  <div className={classes.root}>Homepage</div>
)

const styles = {
  root: {},
}

export default withStyles(styles)(Homepage)
