import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Img from './Img'

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
      extend: responsiveLengths('marginLeft', 0, -150),
    },
    bleedRight: {
      extend: responsiveLengths('marginRight', 0, -150),
    },
    images: {
      justifyContent: 'space-between',
    },
    image1Wrapper: {
      height: 0,
      padding: 0,
    },
    image2Wrapper: {
      padding: 0,
      extend: responsiveLengths('marginTop', 45, 187),
    },
    image: {
      display: 'block',
      width: '100%',
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'ImagesAndText' }
)

export interface ImagesAndTextProps {
  id: string
  internal: {
    type: 'ContentfulPageSectionImagesAndText'
  }
  rightImage: {
    file: {
      url: string
    }
  }
  leftImage: {
    file: {
      url: string
    }
  }
  text: {
    json: any
  }
}

const ImagesAndText: React.FunctionComponent<ImagesAndTextProps> = props => {
  const classes = useStyles()

  const { text, leftImage, rightImage } = props

  return (
    <Container className={cx(classes.root)}>
      <Grid
        container
        alignItemsDesktop="center"
        className={cx({ [classes.rowReverse]: false })}
      >
        <Grid container item mobile={10}>
          <Grid item mobile={8} desktop={4}>
            <ScrollReveal>
              {text && documentToReactComponents(text.json)}
            </ScrollReveal>
          </Grid>
        </Grid>
        <Grid container item mobile={10} className={classes.images}>
          <Grid item mobile={5} className={classes.image1Wrapper}>
            <ScrollReveal>
              <ColorTrails>
                <Img
                  src={leftImage.file.url}
                  alt=""
                  className={classes.image}
                />
              </ColorTrails>
            </ScrollReveal>
          </Grid>
          <Grid
            item
            mobile={7}
            offsetMobile={3}
            className={classes.image2Wrapper}
          >
            <ScrollReveal>
              <ColorTrails>
                <Img
                  src={rightImage.file.url}
                  alt=""
                  className={classes.image}
                />
              </ColorTrails>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ImagesAndText
