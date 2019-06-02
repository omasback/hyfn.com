import * as React from 'react'
import * as cx from 'classnames'
import easings from 'easings-css'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'gatsby'

import { responsiveLengths } from 'styles/mixins'
import constants from 'styles/constants'
import { Theme } from 'layouts'

const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      extend: responsiveLengths('fontSize', 14, 18),
      display: 'inline-block',
      fontWeight: 'bold',
      textDecoration: 'none',
      overflow: 'hidden',
      position: 'relative',
      paddingBottom: '0.5em',
      '&:after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: theme.color,
        transform: 'scaleX(0)',
        transition: 'transform 1s',
        transformOrigin: 'top left',
        transitionTimingFunction: easings.easeOutCirc,
        [constants.mq.desktop]: {
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
      transition: 'transform 1s',
      marginLeft: '-1.3em',
      transitionTimingFunction: easings.easeOutCirc,
    },
    arrow: {},
  }),
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
        <span className={classes.arrow}>-></span> <span>{text}</span>{' '}
        <span className={classes.arrow}>-></span>
      </span>
    </Link>
  )
}

export default ArrowLink
