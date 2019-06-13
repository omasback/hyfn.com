import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ScrollReveal from 'components/display/ScrollReveal'
import { responsiveLengths } from 'styles/mixins'
import { graphql } from 'gatsby'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 60, 180),
        responsiveLengths('marginBottom', 60, 180)
      ),
    },
  },
  { name: 'TextAndText' }
)

const TextAndText: React.FunctionComponent<ITextAndTextProps> = props => {
  const classes = useStyles(props)

  const { text1, text2 } = props

  return (
    <Container className={cx(classes.root)}>
      <Grid
        container
        alignItemsDesktop="flex-start"
        justifyContentDesktop="flex-start"
      >
        <Grid item mobile={8} desktop={4} offsetDesktop={1}>
          <ScrollReveal>{documentToReactComponents(text1.json)}</ScrollReveal>
        </Grid>
        <Grid item mobile={8} desktop={4} offsetDesktop={1}>
          <ScrollReveal>{documentToReactComponents(text2.json)}</ScrollReveal>
        </Grid>
      </Grid>
    </Container>
  )
}

export default TextAndText

export interface ITextAndTextProps {
  id: string
  internal: {
    type: 'ContentfulPageSectionTextAndText'
  }
  text1: {
    json: any
  }
  text2: {
    json: any
  }
}

// text prop should be either a string of html or a contentful rich text json object

export const query = graphql`
  fragment TextAndTextFragment on ContentfulPageSectionTextAndText {
    id
    internal {
      type
    }
    text1 {
      json
    }
    text2 {
      json
    }
  }
`
