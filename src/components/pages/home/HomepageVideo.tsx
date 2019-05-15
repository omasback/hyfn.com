import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    root: {
      display: 'block',
      width: '100%',
    },
  },
  { name: 'HomepageVideo' }
)

const HomepageVideo: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  return (
    <video loop autoPlay muted playsInline className={classes.root}>
      <source
        src="https://www.coloradorafting.net/wp-content/uploads/2017/09/AVA_Overview_802x298_mw002.mp4"
        type="video/mp4"
      />
    </video>
  )
}

export default HomepageVideo
