import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import constants from 'styles/constants'
import ThemeSetter from 'components/display/ThemeSetter'
import { graphql } from 'gatsby'

const useStyles = makeStyles(
  {
    root: {
      height: '100vh',
      position: 'relative',
    },
  },
  { name: 'AboutPlay' }
)

const AboutPlay: React.FunctionComponent<IPlayProps> = props => {
  const classes = useStyles()

  console.log(props)

  return (
    <div className={classes.root}>
      <ThemeSetter
        color={'#fff'}
        backgroundColor={constants.colors.red}
        parent={'AboutPlay'}
      />
      <h1>{props.data.title}</h1>
      <p>{props.data.description}</p>
      {props.data.media &&
        props.data.media.map(m => <img key={m.id} src={m.file.url} />)}
    </div>
  )
}

export default AboutPlay

export interface IPlayProps {
  data: {
    media: Array<{
      id: string
      file: {
        url: string
        contentType: string
      }
    }>
    title: string
    description: string
  }
}
