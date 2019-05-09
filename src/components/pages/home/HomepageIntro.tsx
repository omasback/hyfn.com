import * as React from 'react'
import { OdometerText } from 'components/display/OdometerText'
import { makeStyles } from '@material-ui/styles'

import { ArrowLink } from 'components/display/ArrowLink'

const useStyles = makeStyles(
  {
    root: {
      padding: 0,
      paddingTop: '50vw',
      minHeight: '100vh',
    },
    headline: {
      fontSize: '19vw',
      fontWeight: 'bold',
    },
    headlineLine1: {
      marginLeft: '-3.3vw',
    },
    headlineLine2: {
      marginTop: '-4vw',
      marginLeft: '11.2vw',
    },
  },
  { name: 'HompageIntro' }
)

const HompageIntro: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.headline}>
        <OdometerText text="STILL" className={classes.headlineLine1} />
        <OdometerText text="HERE?" className={classes.headlineLine2} />
      </div>
      <ArrowLink to="/" text={'Might as well get in touch'} />
    </div>
  )
}

export default HompageIntro
