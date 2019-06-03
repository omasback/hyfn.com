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

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 60, 180),
        responsiveLengths('marginBottom', 60, 180)
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
      extend: bleedLeftCSS,
    },
    bleedRight: {
      extend: bleedRightCSS,
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

export interface ImageAndTextProps {
  internal: {
    type: 'ContentfulPageSectionImageAndText'
  }
  imageSide: boolean
  image: {
    file: {
      url: string
    }
  }
  text: {
    json: any
  }
}

const ImageAndText: React.FunctionComponent<ImageAndTextProps> = props => {
  const classes = useStyles()
  const bleedLeft = false
  const bleedRight = false

  const { image, text, imageSide = true } = props

  return (
    <Container className={cx(classes.root)}>
      <Grid
        container
        alignItemsDesktop="center"
        className={cx({ [classes.rowReverse]: !imageSide })}
      >
        <Grid item mobile={8} desktop={bleedLeft || bleedRight ? 4 : 3.5}>
          <ScrollReveal>
            {text && documentToReactComponents(text.json)}
          </ScrollReveal>
        </Grid>
        <Grid item mobile={10} desktop={bleedLeft || bleedRight ? 5 : 6}>
          <ScrollReveal>
            <ColorTrails
              className={cx({
                [classes.bleedLeft]: bleedLeft,
                [classes.bleedRight]: bleedRight,
              })}
            >
              <img src={image.file.url} alt="" className={classes.image} />
            </ColorTrails>
          </ScrollReveal>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ImageAndText
