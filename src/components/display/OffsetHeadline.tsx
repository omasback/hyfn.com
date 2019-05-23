import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'

import OdometerText from 'components/display/OdometerText'
import { responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles(
  {
    root: {
      lineHeight: 0.9,
      fontWeight: 'bold',
      position: 'relative',
      zIndex: 1,
    },
    headlineLine1: {
      extend: responsiveLengths('marginLeft', -52, -164),
    },
    headlineLine2: {},
  },
  { name: 'OffsetHeadline' }
)

const OffsetHeadline: React.FunctionComponent<{
  className?: string
  line1?: string
  line2?: string
}> = ({ className, line1, line2 }) => {
  const classes = useStyles()

  return (
    <h1 className={cx(classes.root, className)}>
      {line1 && <OdometerText text={line1} className={classes.headlineLine1} />}
      {line2 && <OdometerText text={line2} className={classes.headlineLine2} />}
    </h1>
  )
}

export default OffsetHeadline
