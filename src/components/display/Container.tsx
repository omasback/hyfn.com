import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import theme from 'styles/theme'

const useStyles = makeStyles(
  {
    root: {
      margin: '0 auto',
      padding: '0 38px',
      maxWidth: 1290,
      [theme.mq.desktop]: {
        padding: '0 75px',
      },
    },
    inner: {},
  },
  { name: 'Container' }
)

const Container: React.FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.inner}>{children}</div>
    </div>
  )
}

export default Container
