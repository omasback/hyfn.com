import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import ReactPlayer from 'react-player'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'
import { useInView } from 'react-intersection-observer'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 60, 180),
        responsiveLengths('marginBottom', 60, 180)
      ),
    },
    media: {
      display: 'block',
      width: '100%',
      '& video:focus': {
        outline: 'none',
      },
    },
  },
  { name: 'PageSectionMedia' }
)

export interface PageSectionMediaProps {
  internal: {
    type: 'ContentfulPageSectionMedia'
  }
  fullBleed: boolean
  asset: {
    file: {
      url: string
      contentType: string
    }
  }
}

const PageSectionMedia: React.FunctionComponent<
  PageSectionMediaProps
> = props => {
  const classes = useStyles(props)

  const { asset, fullBleed } = props

  const [ref, inView] = useInView({
    threshold: 0.1,
  })

  const mediaElement =
    asset.file.contentType.indexOf('video') === 0 ? (
      // TODO: autoplay video on scroll enter
      <ReactPlayer
        url={asset.file.url}
        controls={false}
        muted
        playsinline
        loop
        playing={inView}
        className={classes.media}
        width={'100%'}
        height="auto"
      />
    ) : (
      // <video loop playsInline controls >
      <img src={asset.file.url} alt="" className={classes.media} />
    )

  return (
    <div ref={ref}>
      {fullBleed ? (
        <div className={cx(classes.root)}>{mediaElement}</div>
      ) : (
        <Container className={cx(classes.root)}>{mediaElement}</Container>
      )}
    </div>
  )
}

export default PageSectionMedia
