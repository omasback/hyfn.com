import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import { observable } from 'mobx'
import { Observer } from 'mobx-react'
import debounce from 'lodash/debounce'

import constants from 'styles/constants'

let previousY = 0
const delta = observable.box(0)

const setDelta = () => {
  let newDelta = window.scrollY - previousY
  if (newDelta > 0) {
    newDelta = Math.min(40, newDelta - 1)
  } else if (newDelta < 0) {
    newDelta = Math.max(-40, newDelta + 1)
  }
  delta.set(newDelta)
  previousY = window.scrollY
}

if (
  typeof window !== `undefined` &&
  window.matchMedia(constants.mq.hoverDevice.replace('@media ', '')).matches
) {
  previousY = window.scrollY

  window.addEventListener('scroll', () => {
    window.requestAnimationFrame(() => {
      setDelta()
    })
  })

  window.addEventListener(
    'scroll',
    debounce(() => {
      window.requestAnimationFrame(() => {
        setDelta()
      })
    }, 20)
  )
}

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
  { name: 'ColorTrails' }
)

const ColorTrails: React.FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  const classes = styles()
  // const { y } = useWindowScroll()
  // const [previousY, setY] = React.useState(y)
  // const delta = y - previousY
  // console.log(previousY, y, delta)
  // setY(y)
  return (
    <div className={cx(classes.root, className)}>
      <Observer>
        {() => (
          <>
            <div
              className={cx(classes.trail, classes.trailRed)}
              style={{ transform: `translateY(${delta.get() * 3}px)` }}
            />
            <div
              className={cx(classes.trail, classes.trailBlue)}
              style={{ transform: `translateY(${delta.get() * 2}px)` }}
            />
            <div
              className={cx(classes.trail, classes.trailYello)}
              style={{ transform: `translateY(${delta.get()}px)` }}
            />
          </>
        )}
      </Observer>
      <div className={classes.child}>{children}</div>
    </div>
  )
}

export default ColorTrails
