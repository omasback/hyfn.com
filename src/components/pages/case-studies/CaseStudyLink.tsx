import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import ArrowLink from 'components/display/ArrowLink'
import Grid from 'components/display/Grid'
import ScrollReveal from 'components/display/ScrollReveal'
import ThemeSetter from 'components/display/ThemeSetter'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
      minHeight: '80vh',
      extend: merge(
        responsiveLengths('paddingTop', 30, 90),
        responsiveLengths('paddingBottom', 30, 90)
      ),
    },
    rootEven: {},
    rootOdd: {
      [constants.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
    imageWrapper: {
      position: 'relative',
    },
    image: {
      display: 'block',
      width: '100%',
    },
    number: {
      extend: responsiveLengths('fontSize', 14, 17),
      position: 'absolute',
      top: 0,
    },
    numberOdd: { extend: responsiveLengths('left', -28, -44) },
    numberEven: { extend: responsiveLengths('right', -28, -44) },
    textOdd: {
      [constants.mq.desktop]: {
        marginLeft: '10%',
      },
    },
    title: {
      extend: merge(
        responsiveLengths('marginTop', 12, 0),
        responsiveLengths('marginBottom', 17, 30)
      ),
    },
    description: {
      extend: responsiveLengths('marginBottom', 16, 50),
      [constants.mq.desktop]: {
        maxWidth: '13em',
      },
    },
  },
  { name: 'CaseStudyLink' }
)

const CaseStudyLink: React.FunctionComponent<{
  title: string
  description: string
  url: string
  image: string
  color?: string
  backgroundColor?: string
  number: number
  rowReverse?: boolean
}> = ({
  title,
  description,
  url,
  image,
  color,
  backgroundColor,
  number,
  rowReverse = false,
}) => {
  const classes = useStyles()

  return (
    <Grid
      container
      alignItemsDesktop="center"
      className={cx(classes.root, {
        [classes.rootEven]: rowReverse,
        [classes.rootOdd]: !rowReverse,
      })}
    >
      <ThemeSetter color={color} backgroundColor={backgroundColor} />
      <Grid item mobile={8} desktop={4.5}>
        <ScrollReveal className={classes.imageWrapper}>
          <div
            className={cx(classes.number, {
              [classes.numberEven]: rowReverse,
              [classes.numberOdd]: !rowReverse,
            })}
          >
            {((number + 1) / 100).toFixed(2).slice(2)}
          </div>
          <img src={image} alt="" className={classes.image} />
        </ScrollReveal>
      </Grid>
      <Grid
        item
        mobile={8}
        desktop={4}
        className={cx({
          [classes.textOdd]: !rowReverse,
        })}
      >
        <ScrollReveal>
          <h2 className={classes.title}>{title}</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className={classes.description}>{description}</p>
        </ScrollReveal>
        <ScrollReveal>
          <ArrowLink to={url} text="View Project" />
        </ScrollReveal>
      </Grid>
    </Grid>
  )
}

export default CaseStudyLink
