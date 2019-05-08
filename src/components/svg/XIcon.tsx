import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    path: {
      transition: 'color 0.3s',
    },
  },
  { name: 'HyfnLogo' }
)

interface Props extends React.SVGAttributes<{}> {
  barLength?: number
  strokeWidth?: number
  strokeLinecap?: 'square' | 'round'
  color?: string
}

const XIcon: React.FunctionComponent<Props> = ({
  color,
  barLength,
  strokeWidth,
  strokeLinecap,
  ...props
}) => {
  const classes = useStyles()

  const length = barLength || 10

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${length} ${length}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        className={classes.path}
        stroke={color || '#3c3c40'}
        strokeWidth={strokeWidth || 1}
        strokeLinecap={strokeLinecap || 'square'}
        d={`M0,0L${length},${length}M${length},0L0,${length}`}
      />
    </svg>
  )
}

export default XIcon
