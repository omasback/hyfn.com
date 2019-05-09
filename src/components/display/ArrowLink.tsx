import * as React from 'react'
import * as cx from 'classnames'
import easings from 'easings-css'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'

import theme from 'styles/theme'

const useStyles = makeStyles(
  {
    root: {
      display: 'inline-block',
      fontWeight: 'bold',
      color: theme.colors.darkGray,
      textDecoration: 'none',
      fontSize: 14,
      overflow: 'hidden',
      position: 'relative',
      paddingBottom: '0.5em',
      [theme.mq.desktop]: {
        fontSize: 18,
      },
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: theme.colors.darkGray,
        transform: 'scaleX(0)',
        transition: 'all 1s',
        transformOrigin: 'top left',
        transitionTimingFunction: easings.easeOutCirc,
        [theme.mq.desktop]: {
          height: 4,
        },
      },
      '&:hover:after': {
        transform: 'scaleX(1)',
      },
      '&:hover > $inner': {
        transform: 'translateX(1.3em)',
      },
    },
    inner: {
      display: 'inline-block',
      transition: 'all 1s',
      marginLeft: '-1.3em',
      transitionTimingFunction: easings.easeOutCirc,
    },
    arrow: {},
  },
  { name: 'ArrowLink' }
)

const ArrowLink: React.FunctionComponent<{
  to: string
  text: string
  className?: string
}> = ({ to, text, className }) => {
  const classes = useStyles()

  return (
    <Link to={to} className={cx(classes.root, className)}>
      <span className={classes.inner}>
        <span className={classes.arrow}>-></span> {text}{' '}
        <span className={classes.arrow}>-></span>
      </span>
    </Link>
  )
}

export { ArrowLink }
