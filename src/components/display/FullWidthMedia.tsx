import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 40, 150),
        responsiveLengths('marginBottom', 40, 150)
      ),
    },
    img: {
      display: 'block',
      width: '100%',
    },
  },
  { name: 'FullWidthMedia' }
)

const FullWidthMedia: React.FunctionComponent<{ className?: string }> = ({
  className,
  children,
}) => {
  const classes = useStyles()
  return (
    <div className={cx(classes.root, className)}>
      <img src="" alt="" className={classes.img} />
    </div>
  )
}

export default FullWidthMedia
