import * as React from 'react'
import withStyles, { WithStyles } from 'react-jss'
import theme from '../styles/theme'
import HomepageHero from './HomepageHero'

interface Props extends WithStyles<typeof styles> {}

const Homepage: React.FunctionComponent<Props> = ({ classes }) => (
  <div className={classes.root}>
    <HomepageHero />
  </div>
)

const styles = {
  root: {},
}

export default withStyles(styles)(Homepage)
