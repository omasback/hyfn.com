import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import ArrowLink from 'components/display/ArrowLink'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import theme from 'styles/theme'
import { responsiveLengths } from 'styles/mixins'
import { ThemeContext } from 'components/App'
import { useInView } from 'react-intersection-observer'

const useStyles = makeStyles(
  {
    work: {
      extend: merge(
        responsiveLengths('marginTop', 60, 180),
        responsiveLengths('marginBottom', 60, 180)
      ),
    },
    workEven: {},
    workOdd: {
      [theme.mq.desktop]: {
        flexDirection: 'row-reverse',
      },
    },
    image: {
      display: 'block',
      width: '100%',
    },
    workNumber: {
      extend: responsiveLengths('fontSize', 14, 17),
      position: 'absolute',
      top: 0,
    },
    workNumberOdd: { extend: responsiveLengths('left', -28, -44) },
    workNumberEven: { extend: responsiveLengths('right', -28, -44) },
    textOdd: {
      [theme.mq.desktop]: {
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
      [theme.mq.desktop]: {
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
  const theme = React.useContext(ThemeContext)
  const [ref, inView] = useInView({
    threshold: 1,
  })
  React.useEffect(
    () =>
      theme.setTheme(
        inView ? color : undefined,
        inView ? backgroundColor : undefined
      ),
    [inView]
  )

  return (
    <Grid
      container
      alignItemsDesktop="center"
      className={cx(classes.work, {
        [classes.workEven]: rowReverse,
        [classes.workOdd]: !rowReverse,
      })}
    >
      <Grid item mobile={8} desktop={4.5}>
        <ScrollReveal>
          <ColorTrails>
            <div
              className={cx(classes.workNumber, {
                [classes.workNumberEven]: rowReverse,
                [classes.workNumberOdd]: !rowReverse,
              })}
            >
              {((number + 1) / 100).toFixed(2).slice(2)}
            </div>
            <img src={image} alt="" className={classes.image} ref={ref} />
          </ColorTrails>
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
