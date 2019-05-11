import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { responsiveLengths } from 'styles/helpers'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('paddingLeft', 38, 150),
        responsiveLengths('paddingRight', 38, 150)
      ),
      paddingTop: 0,
      paddingBottom: 0,
      margin: '0 auto',
      maxWidth: 1440,
    },
  },
  { name: 'Container' }
)

const Container: React.FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  const classes = useStyles()
  return <div className={cx(classes.root, className)}>{children}</div>
}

export default Container
