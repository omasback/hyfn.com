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

  const mediaElement =
    asset.file.contentType.indexOf('video') === 0 ? (
      // TODO: autoplay video on scroll enter
      <video loop playsInline controls className={classes.media}>
        <source src={asset.file.url} type={asset.file.contentType} />
      </video>
    ) : (
      <img src={asset.file.url} alt="" className={classes.media} />
    )

  return (
    <>
      {fullBleed ? (
        <div className={cx(classes.root)}>{mediaElement}</div>
      ) : (
        <Container className={cx(classes.root)}>{mediaElement}</Container>
      )}
    </>
  )
}

export default PageSectionMedia
