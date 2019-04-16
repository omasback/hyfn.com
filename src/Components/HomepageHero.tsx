import * as React from 'react'
import withStyles, { WithStyles } from 'react-jss'
// import { css } from '@emotion/core' // doesnt work
import { css } from 'emotion'
import { makeStyles, createStyles } from '@material-ui/styles'

import { createStylesHook } from '../helpers/createStylesHook'
import theme from '../styles/theme'

interface Props extends WithStyles<typeof styles> {}

// Straight JSS. Requires HOC
const styles = {
  h1JSS: {
    margin: 0,
    color: theme.colors.red,
  },
}

// Material JSS. Uses Hook instead of HOC
// can also use tagged template literals or HOC's if you want
// https://material-ui.com/css-in-js/basics/
// autocomplete soon without createStyles? https://github.com/mui-org/material-ui/pull/15366
const useStyles = createStylesHook({
  h1Material: {
    margin: 0,
    color: theme.colors.yellow,
  },
})

// emotion v9 has autocomplete, can define styles inline
const h1Emotion = css({
  margin: 0,
  color: theme.colors.blue,
})

const HomepageHero: React.FunctionComponent<Props> = ({ classes }) => {
  const materialClasses = useStyles()
  return (
    <div>
      <h1 className={classes.h1JSS}>HYFN</h1>
      <h1 className={h1Emotion}>HYFN</h1>
      <h1 className={materialClasses.h1Material}>HYFN</h1>
    </div>
  )
}

export default withStyles(styles)(HomepageHero)
