import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import { Theme } from 'layouts'

const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      transition: 'background-color 0.5s, color 0.5s',
    },
    color: {
      color: theme.color,
    },
    backgroundColor: {
      backgroundColor: theme.backgroundColor,
    },
  }),
  { name: 'Mui-ThemeTransition' }
)

const ThemeTransition: React.FunctionComponent<{
  color?: boolean
  backgroundColor?: boolean
  className?: string
}> = ({ color, backgroundColor, className, children }) => {
  const classes = useStyles()
  return (
    <div
      className={cx(
        classes.root,
        {
          [classes.color]: color,
          [classes.backgroundColor]: backgroundColor,
        },
        className
      )}
    >
      {children}
    </div>
  )
}

export default ThemeTransition
