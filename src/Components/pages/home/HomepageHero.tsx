import * as React from 'react'
import { createStylesHook } from '../../../helpers/createStylesHook'
import theme from '../../../styles/theme'

interface Props {}

// Material-UI's JSS implementation. Uses Hook instead of HOC
// can also use tagged template literals or HOC's if you want
// https://material-ui.com/css-in-js/basics/
// autocomplete soon without createStyles? https://github.com/mui-org/material-ui/pull/15366
const useStyles = createStylesHook({
  h1: {
    margin: 0,
    color: theme.colors.blue,
  },
})

const HomepageHero: React.FunctionComponent<Props> = () => {
  const classes = useStyles()
  return (
    <div>
      <h1 className={classes.h1}>HYFN</h1>
    </div>
  )
}

export default HomepageHero
