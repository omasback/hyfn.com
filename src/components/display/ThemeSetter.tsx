import * as React from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'

import { useInView } from 'react-intersection-observer'
import { Theme } from 'layouts'
import constants from 'styles/constants'

// This Component uses absolute positioning to fill the area of a parent or ancestor element,
// So make sure to apply a positioning to the ancestor that you wish to track.

const rootMargins = ['49%', '0%', '49%', '0%']

const useStyles = makeStyles(
  {
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pointerEvents: 'none',
      // border: '1px solid #ffff00', // to help with debugging
    },
    // for debugging, this visuallizes the intersection root area:
    // rootMargin: {
    //   position: 'fixed',
    //   top: rootMargins[0],
    //   right: rootMargins[1],
    //   bottom: rootMargins[2],
    //   left: rootMargins[3],
    //   backgroundColor: 'rgba(0, 0, 0, 0.1)',
    // },
  },
  { name: 'Mui-ThemeSetter' }
)

const ThemeSetter: React.FunctionComponent<{
  color?: string // desired text color and other foreground elements
  backgroundColor?: string // desired background color of the page
  parent?: string // parent component name to help with debugging
}> = ({
  color = constants.colors.darkGray,
  backgroundColor = constants.colors.lightGray,
  parent,
}) => {
  const { setTheme } = useTheme<Theme>()
  const classes = useStyles()
  const [ref, inView] = useInView({
    threshold: 0,
    rootMargin: rootMargins.map(n => '-' + n).join(' '),
  })

  React.useEffect(() => {
    // console.log(parent, inView)
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
      setTheme()
    }
  }, [setTheme])

  return (
    <div ref={ref} className={classes.root}>
      {/* <div className={classes.rootMargin} /> */}
    </div>
  )
}

export default ThemeSetter
