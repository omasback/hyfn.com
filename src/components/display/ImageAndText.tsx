import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import constants from 'styles/constants'
import {
  responsiveLengths,
  bleedLeft as bleedLeftCSS,
  bleedRight as bleedRightCSS,
} from 'styles/mixins'
import { graphql } from 'gatsby'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 60, 150),
        responsiveLengths('marginBottom', 60, 150)
      ),
    },
    rowReverse: {
      [constants.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
    subheadline: {
      extend: responsiveLengths('fontSize', 21, 38),
      fontWeight: 'bold',
      marginBottom: '0.8em',
      [constants.mq.desktop]: {
        marginTop: '2.4em',
      },
    },
    bleedLeft: {
      extend: bleedLeftCSS(),
    },
    bleedRight: {
      extend: bleedRightCSS(),
    },
    image: {
      display: 'block',
      width: '100%',
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'ImageAndText' }
)

const ImageAndText: React.FunctionComponent<ImageAndTextProps> = props => {
  const classes = useStyles()
  const bleedLeft = false
  const bleedRight = false

  const { image, text, imageSide = true } = props

  let textElement

  if (text) {
    if (typeof text === 'string') {
      textElement = <div dangerouslySetInnerHTML={{ __html: text }} />
    } else {
      textElement = documentToReactComponents(text.json)
    }
  } else {
    textElement = ''
  }

  const landscapeImage =
    image.file.details.image.width > image.file.details.image.height

  const imageOnLeft = imageSide

  let layout
  if (landscapeImage) {
    layout = imageOnLeft
      ? layouts.landscapeImageLeft
      : layouts.landscapeImageRight
  } else {
    layout = imageOnLeft
      ? layouts.portraitImageLeft
      : layouts.portraitImageRight
  }

  const textBox = (
    <Grid
      item
      mobile={8}
      desktop={layout.textWidth}
      offsetDesktop={layout.textOffset}
    >
      <ScrollReveal>{textElement}</ScrollReveal>
    </Grid>
  )

  const imgBox = (
    <Grid
      item
      mobile={10}
      desktop={layout.imageWidth}
      offsetDesktop={layout.imageOffset}
    >
      <ScrollReveal>
        <ColorTrails>
          <img src={image.file.url} alt="" className={classes.image} />
        </ColorTrails>
      </ScrollReveal>
    </Grid>
  )

  return (
    <Container className={cx(classes.root)}>
      <Grid
        container
        alignItemsDesktop="center"
        justifyContentDesktop="flex-start"
      >
        {imageOnLeft && imgBox}
        {textBox}
        {!imageOnLeft && imgBox}
      </Grid>
    </Container>
  )
}

export default ImageAndText

export interface ImageAndTextProps {
  id: string
  internal: {
    type: 'ContentfulPageSectionImageAndText'
  }
  imageSide: boolean // true = left, false = right
  image: {
    file: {
      url: string
      details: {
        image: {
          height: number
          width: number
        }
      }
    }
  }
  text: {
    json: any
  }
}

// text prop should be either a string of html or a contentful rich text json object

export const query = graphql`
  fragment ImageAndTextFragment on ContentfulPageSectionImageAndText {
    id
    internal {
      type
    }
    imageSide
    image {
      file {
        url
        details {
          image {
            height
            width
          }
        }
      }
    }
    text {
      json
    }
  }
`

const layouts = {
  landscapeImageLeft: {
    imageOffset: 0,
    imageWidth: 6,
    textOffset: 1,
    textWidth: 3,
  },
  landscapeImageRight: {
    imageOffset: 1,
    imageWidth: 6,
    textOffset: 0,
    textWidth: 3,
  },
  portraitImageLeft: {
    imageOffset: 0,
    imageWidth: 4.5,
    textOffset: 1.5,
    textWidth: 3,
  },
  portraitImageRight: {
    imageOffset: 1.5,
    imageWidth: 4.5,
    textOffset: 1,
    textWidth: 3,
  },
}
