import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { RouteComponentProps, matchPath } from 'react-router-dom'

import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import theme from 'styles/theme'
import { responsiveLengths, bleedLeft, bleedRight } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 60, 180),
        responsiveLengths('marginBottom', 60, 180)
      ),
    },
    rowReverse: {
      [theme.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
    subheadline: {
      extend: responsiveLengths('fontSize', 21, 38),
      fontWeight: 'bold',
      marginBottom: '0.8em',
      [theme.mq.desktop]: {
        marginTop: '2.4em',
      },
    },
    bleedLeft: {
      extend: bleedLeft,
    },
    bleedRight: {
      extend: bleedRight,
    },
    image: {
      display: 'block',
      width: '100%',
    },
    largerCopy: {
      extend: responsiveLengths('fontSize', 17, 28),
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'ImageAndText' }
)

interface Props {
  imageUrl?: string
  className?: string
  rowReverse?: boolean
  bleedLeft?: boolean
  bleedRight?: boolean
}

const ImageAndText: React.FunctionComponent<Props> = ({
  imageUrl = 'http://via.placeholder.com/676x450',
  className,
  rowReverse = false,
  bleedLeft = false,
  bleedRight = false,
  children,
}) => {
  const classes = useStyles()

  return (
    <Container className={cx(classes.root, className)}>
      <Grid
        container
        alignItemsDesktop="center"
        className={cx({ [classes.rowReverse]: rowReverse })}
      >
        <Grid item mobile={8} desktop={bleedLeft || bleedRight ? 4 : 3.5}>
          <ScrollReveal>{children}</ScrollReveal>
        </Grid>
        <Grid item mobile={10} desktop={bleedLeft || bleedRight ? 5 : 6}>
          <ScrollReveal>
            <ColorTrails
              className={cx({
                [classes.bleedLeft]: bleedLeft,
                [classes.bleedRight]: bleedRight,
              })}
            >
              <img src={imageUrl} alt="" className={classes.image} />
            </ColorTrails>
          </ScrollReveal>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ImageAndText
