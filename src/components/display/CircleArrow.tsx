import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles(
  {
    root: {
      extend: responsiveLengths([
        ['width', 56, 56],
        ['height', 56, 56],
        ['paddingLeft', 7, 7],
        ['paddingBottom', 1, 1],
        ['fontSize', 24, 24],
      ]),
      lineHeight: 0,
      borderRadius: '50%',
      backgroundColor: '#fff',
      color: constants.colors.darkGray,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      transition: 'opacity 0.3s',
    },
    rootDisabled: {
      opacity: 0.5,
    },
    up: {
      transform: 'rotateZ(-90deg)',
    },
    right: {
      transform: 'rotateZ(0deg)',
    },
    down: {
      transform: 'rotateZ(90deg)',
    },
    left: {
      transform: 'rotateZ(180deg)',
    },
  },
  { name: 'CircleArrow' }
)

interface ICircleArrow {
  direction: 'up' | 'right' | 'down' | 'left'
  disabled?: boolean
  className?: string
  onClick?: () => void
}

const CircleArrow: React.FunctionComponent<ICircleArrow> = props => {
  const classes = useStyles(props)

  const { direction, disabled, className, onClick } = props

  return (
    <div
      className={cx(classes.root, classes[direction], className, {
        [classes.rootDisabled]: disabled,
      })}
      onClick={onClick}
    >
      {'->'}
    </div>
  )
}

export default CircleArrow
