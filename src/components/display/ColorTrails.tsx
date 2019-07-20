import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'

import constants from 'styles/constants'
import { ScrollContext } from 'components/page-wrapper/ScrollContext'

const styles = makeStyles(
  {
    root: {
      position: 'relative',
      pointerEvents: 'none',
    },
    child: {
      position: 'relative',
    },
    trail: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      willChange: 'transform',
      transition: 'transform 0.15s',
    },
    trailRed: {
      backgroundColor: constants.colors.red,
    },
    trailBlue: {
      backgroundColor: constants.colors.blue,
    },
    trailYello: {
      backgroundColor: constants.colors.yellow,
    },
  },
  { name: 'Mui-ColorTrails' }
)

const ColorTrails: React.FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  const classes = styles()

  const scrollDeltaY = React.useContext(ScrollContext)

  return (
    <div className={cx(classes.root, className)}>
      <div
        className={cx(classes.trail, classes.trailRed)}
        style={{ transform: `translateY(${scrollDeltaY * 3}px)` }}
      />
      <div
        className={cx(classes.trail, classes.trailBlue)}
        style={{ transform: `translateY(${scrollDeltaY * 2}px)` }}
      />
      <div
        className={cx(classes.trail, classes.trailYello)}
        style={{ transform: `translateY(${scrollDeltaY}px)` }}
      />

      <div className={classes.child}>{children}</div>
    </div>
  )
}

export default ColorTrails
