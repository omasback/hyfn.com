import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import OdometerText from 'components/display/OdometerText'
import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import theme from 'styles/theme'
import { responsiveLengths } from 'styles/helpers'
import { relative } from 'path'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('paddingTop', 80, 140),
        responsiveLengths('paddingBottom', 116, 140)
      ),
    },
    headlineAndLink: {
      position: 'relative',
      extend: responsiveLengths('left', 90, 0),
    },
    headline: {
      extend: responsiveLengths('marginBottom', 34, 46),
      lineHeight: 0.9,
      fontWeight: 'bold',
    },
    headlineLine1: {
      extend: responsiveLengths('marginLeft', -52, -194),
    },
    headlineLine2: {},
    work: {
      extend: merge(responsiveLengths('marginTop', 40, 70)),
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
    cta: {
      marginBottom: '4vw',
    },
  },
  { name: 'HompageProjects' }
)

const works = [
  {
    title: 'New Balance',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '',
    image: 'http://via.placeholder.com/488x629',
  },
  {
    title: 'Skyzone',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '',
    image: 'http://via.placeholder.com/488x629',
  },
  {
    title: 'Viva Coco',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '',
    image: 'http://via.placeholder.com/488x629',
  },
]

const HompageProjects: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.headlineAndLink}>
        <h1 className={classes.headline}>
          <OdometerText text="LOOK" className={classes.headlineLine1} />
          <OdometerText text="PROOF!" className={classes.headlineLine2} />
        </h1>
        <ScrollReveal>
          <ArrowLink
            to="/"
            text={'We Do Work That Works'}
            className={classes.cta}
          />
        </ScrollReveal>
      </div>
      {works.map((work, i) => (
        <Grid
          key={work.title}
          container
          alignItemsDesktop="center"
          className={cx(classes.work, {
            [classes.workEven]: i % 2,
            [classes.workOdd]: !(i % 2),
          })}
        >
          <Grid item mobile={8} desktop={4.5}>
            <ScrollReveal>
              <ColorTrails>
                <div
                  className={cx(classes.workNumber, {
                    [classes.workNumberEven]: i % 2,
                    [classes.workNumberOdd]: !(i % 2),
                  })}
                >
                  {((i + 1) / 100).toFixed(2).slice(2)}
                </div>
                <img src={work.image} alt="" className={classes.image} />
              </ColorTrails>
            </ScrollReveal>
          </Grid>
          <Grid
            item
            mobile={8}
            desktop={4}
            className={cx({
              [classes.textOdd]: !(i % 2),
            })}
          >
            <ScrollReveal>
              <h2 className={classes.title}>{work.title}</h2>
            </ScrollReveal>
            <ScrollReveal>
              <p className={classes.description}>{work.description}</p>
            </ScrollReveal>
            <ScrollReveal>
              <ArrowLink to={work.url} text="View Project" />
            </ScrollReveal>
          </Grid>
        </Grid>
      ))}
    </Container>
  )
}

export default HompageProjects
