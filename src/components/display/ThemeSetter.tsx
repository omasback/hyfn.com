import * as React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { useInView } from 'react-intersection-observer'
import { Theme } from 'components/App'
import constants from 'styles/constants'

// This Component uses absolute positioning to fill the area of a parent or ancestor element,
// So make sure to apply a positioning to the ancestor that you wish to track.

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
  color?: string // desired text color and other foreground elements
  backgroundColor?: string // desired background color of the page
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

  React.useEffect(() => {
    return () => {
      // This will only run on unmount
      // if you put the cleanup function in an effect with dependencies,
      // it will run every time dependencies change,
      // prematurely clearing the theme (bad)
      console.log('without dependency change')
      setTheme()
    }
  }, [setTheme])

  return <div ref={ref} className={classes.root} />
}

export default ThemeSetter
