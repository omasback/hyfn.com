import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import ReactPlayer from 'react-player'
import axios from 'axios'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'
import { useInView } from 'react-intersection-observer'
import { graphql } from 'gatsby'
import Img from './Img'

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
    embedContainer: {
      display: 'flex',
    },
    spacer: {
      width: 0,
    },
  },
  { name: 'Mui-PageSectionMedia' }
)

const PageSectionMedia: React.FunctionComponent<
  IPageSectionMediaProps
> = props => {
  const classes = useStyles(props)

  const { asset, embedUrl, fullBleed } = props

  const [ref, inView] = useInView({
    threshold: 0.1,
  })

  const [aspectRatio, setAspectRatio] = React.useState(0)

  const videoUrl = embedUrl ? embedUrl : asset.file.url

  React.useEffect(() => {
    if (
      window &&
      embedUrl &&
      embedUrl.indexOf('vimeo') > -1 &&
      aspectRatio === 0
    ) {
      // here we fetch some json data about the video
      // which contains the dimension so that we may set the
      // aspect ratio of the iframe
      axios
        .get(`https://vimeo.com/api/oembed.json?url=${embedUrl}`)
        .then(resp => {
          if (resp.data && resp.data.width && resp.data.height) {
            setAspectRatio(resp.data.width / resp.data.height)
          }
        })
    }
  }, [embedUrl])

  const mediaElement =
    embedUrl || asset.file.contentType.indexOf('video') === 0 ? (
      // TODO: autoplay video on scroll enter
      <div className={classes.embedContainer}>
        {aspectRatio > 0 && (
          <div
            className={classes.spacer}
            style={{ paddingTop: (1 / aspectRatio) * 100 + '%' }}
          />
        )}
        <ReactPlayer
          url={videoUrl}
          controls={false}
          muted
          playsinline
          loop
          playing={inView}
          className={classes.media}
          width={'100%'}
          height="auto"
        />
      </div>
    ) : (
      // <video loop playsInline controls >
      <Img src={asset.file.url} alt="" className={classes.media} />
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

export interface IPageSectionMediaProps {
  id: string
  internal: {
    type: 'ContentfulPageSectionMedia'
  }
  embedUrl: string
  fullBleed: boolean
  asset: {
    file: {
      url: string
      contentType: string
    }
  }
}

export const query = graphql`
  fragment MediaFragment on ContentfulPageSectionMedia {
    id
    embedUrl
    fullBleed
    internal {
      type
    }
    asset {
      file {
        url
        contentType
      }
    }
  }
`
