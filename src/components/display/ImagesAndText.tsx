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
import { responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 60, 220),
        responsiveLengths('marginBottom', 60, 220)
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
    largerCopy: {
      extend: responsiveLengths('fontSize', 17, 28),
    },
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'ImagesAndText' }
)

interface Props {
  imageUrl1?: string
  imageUrl2?: string
  className?: string
  rowReverse?: boolean
}

const ImagesAndText: React.FunctionComponent<Props> = ({
  imageUrl1 = 'http://via.placeholder.com/676x450',
  imageUrl2 = 'http://via.placeholder.com/676x450',
  className,
  rowReverse = false,
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
        <Grid container item mobile={10}>
          <Grid item mobile={8} desktop={4}>
            <ScrollReveal>{children}</ScrollReveal>
          </Grid>
        </Grid>
        <Grid container item mobile={10} className={classes.images}>
          <Grid item mobile={5} className={classes.image1Wrapper}>
            <ScrollReveal>
              <ColorTrails>
                <img src={imageUrl1} alt="" className={classes.image} />
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
                <img src={imageUrl2} alt="" className={classes.image} />
              </ColorTrails>
            </ScrollReveal>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ImagesAndText
