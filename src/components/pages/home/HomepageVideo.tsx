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

interface IProps {
  cms: { file: { url: string } }
}

const HomepageVideo: React.FunctionComponent<IProps> = props => {
  const classes = useStyles()

  console.log(props)

  return (
    <video loop autoPlay muted playsInline className={classes.root}>
      <source src={props.cms.file.url} type="video/mp4" />
    </video>
  )
}

export default HomepageVideo
