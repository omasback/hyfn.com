import * as React from 'react'
import * as cx from 'classnames'
import { useInView } from 'react-intersection-observer'
import easings from 'easings-css'
import { makeStyles } from '@material-ui/styles'

import theme from 'styles/theme'

const useStyles = makeStyles(
  {
    root: {
      transition: 'all 1.5s',
      transitionTimingFunction: easings.easeOutQuint,
    },
    fadeUp: {
      transform: 'translateY(100px)',
      opacity: 0,
    },
    rootIn: {
      transform: 'none',
      opacity: 1,
    },
  },
  { name: 'ScrollReveal' }
)

const ScrollReveal: React.FunctionComponent<{
  animation?: 'fadeUp'
  className?: string
}> = ({ animation = 'fadeUp', className, children }) => {
  const classes = useStyles()
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: theme.triggerOnce,
  })

  return (
    <div
      className={cx(classes.root, classes[animation], className, {
        [classes.rootIn]: inView,
      })}
      ref={ref}
    >
      {children}
    </div>
  )
}

export default ScrollReveal