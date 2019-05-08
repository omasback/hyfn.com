import * as React from 'react'
import theme from 'styles/theme'
import { withStyles, createStyles, WithStyles } from '@material-ui/styles'

// Material-UI's JSS implementation.
// Must use HOC version for class component
// https://material-ui.com/css-in-js/basics/
// autocomplete soon without createStyles? https://github.com/mui-org/material-ui/pull/15366
const styles = createStyles({
  root: {
    height: '100vh',
  },
  h1: {
    margin: 0,
    color: theme.colors.blue,
  },
})

interface Props extends WithStyles<typeof styles> {}

class HomepageHero extends React.Component<Props> {
  componentDidMount() {
    console.log('hello!')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <h1 className={classes.h1}>HYFN</h1>
      </div>
    )
  }
}

export default withStyles(styles)(HomepageHero)
