import * as React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { useInView } from 'react-intersection-observer'
import { Theme } from 'components/App'
import constants from 'styles/constants'

const useStyles = makeStyles(
  {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
    },
  },
  { name: 'ThemeSetter' }
)

const ThemeSetter: React.FunctionComponent<{
  color?: string
  backgroundColor?: string
}> = ({
  color = constants.colors.darkGray,
  backgroundColor = constants.colors.lightGray,
}) => {
  const { setTheme } = useTheme<Theme>()
  const classes = useStyles()
  const [ref, inView] = useInView({
    threshold: 0.5,
  })
  React.useEffect(() => {
    if (inView) {
      setTheme(color, backgroundColor)
    }
  }, [inView, color, backgroundColor, setTheme])

  return <div ref={ref} className={classes.root} />
}

export default ThemeSetter
