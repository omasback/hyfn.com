import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'

import Container from 'components/display/Container'
import constants from 'styles/constants'
import { responsiveLengths, largeParagraph } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import ThemeSetter from 'components/display/ThemeSetter'
import Grid from 'components/display/Grid'
import CircleArrow from 'components/display/CircleArrow'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const timeout = 500

const useStyles = makeStyles(
  {
    root: {
      position: 'relative',
      extend: merge(
        responsiveLengths('marginTop', 71, 140),
        responsiveLengths('marginBottom', 116, 150)
      ),
    },
    headline: {
      marginBottom: '0.3em',
      [constants.mq.desktop]: {
        marginBottom: '0.4em',
      },
    },
    relative: {
      position: 'relative',
    },
    subheadline: {
      marginBottom: '1.5em',
    },
    testimonialTransitionContainer: {
      position: 'relative',
      extend: responsiveLengths('height', 270, 320),
    },
    testimonialTransition: {
      border: '1px solid #0f0',
    },
    testimonial: {
      opacity: 1,
      transition: `opacity ${timeout}ms`,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
    },
    enter: {
      opacity: 0,
    },
    enterActive: {
      opacity: 1,
    },
    exitActive: {
      opacity: 0,
    },
    quote: {
      extend: largeParagraph(),
      marginTop: '0',
    },
    person: {
      marginBottom: 0,
    },
    buttons: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      display: 'flex',
      [constants.mq.desktop]: {
        display: 'none',
      },
    },
    button: {
      extend: merge(responsiveLengths('marginLeft', 5, 5)),
    },
    logos: {
      extend: merge(responsiveLengths('marginTop', 70, 70)),
      display: 'none',
      [constants.mq.desktop]: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '70px',
      },
    },
    logo: {
      cursor: 'pointer',
      opacity: 0.5,
      transition: 'opacity 0.3s',
      extend: merge(
        responsiveLengths('maxHeight', 70, 70),
        responsiveLengths('marginLeft', 40, 40),
        responsiveLengths('marginRight', 40, 40)
      ),
    },
    logoActive: {
      opacity: 1,
    },
  },
  { name: 'Mui-AboutTestimonials' }
  // Mui prefix is required for deterministic classnames.
  // Because the theme changes when changing testimonials,
  // non-deterministic classnames will change with the new theme
  // the classnames need to stay the same because the exiting testimonial
  // will retain the original classname,
  // probably because CSSTransitionGroup does not update exiting elements.
)

const AboutTestimonials: React.FunctionComponent<{
  testimonials: Testimonial[]
}> = props => {
  const classes = useStyles()

  // const classes = {}

  const { testimonials } = props

  const [index, setIndex] = React.useState(0)

  const testimonial = testimonials[index].node

  return (
    <Container className={classes.root}>
      <ThemeSetter
        color={testimonial.textColor}
        backgroundColor={testimonial.backgroundColor}
        parent={'AboutTestimonials'}
      />
      <OffsetHeadline text="TESTI-\nMONIAL" className={classes.headline} />
      <Grid container className={classes.relative}>
        <Grid item mobile={8} desktop={3} offsetDesktop={1}>
          <h3 className={classes.subheadline}>We’re Always in Good Company</h3>
        </Grid>
        <Grid item mobile={8} desktop={5}>
          <TransitionGroup className={classes.testimonialTransitionContainer}>
            <CSSTransition
              key={testimonial.id}
              timeout={timeout}
              classNames={{
                enter: classes.enter,
                enterActive: classes.enterActive,
                exitActive: classes.exitActive,
              }}
            >
              <div className={classes.testimonial}>
                <p className={classes.quote}>{testimonial.quote}</p>
                <p className={classes.person}>
                  <b>{testimonial.personName}</b>
                  <br />
                  {testimonial.personTitle}
                </p>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </Grid>
        <div className={classes.buttons}>
          <CircleArrow
            direction={'left'}
            className={classes.button}
            disabled={index === 0}
            onClick={() => setIndex(Math.max(index - 1, 0))}
          />
          <CircleArrow
            direction={'right'}
            className={classes.button}
            disabled={index === testimonials.length - 1}
            onClick={() =>
              setIndex(Math.min(index + 1, testimonials.length - 1))
            }
          />
        </div>
      </Grid>
      <div className={classes.logos}>
        {testimonials.map((t, i) => (
          <img
            src={t.node.companyLogo.file.url}
            alt=""
            key={t.node.id}
            className={cx(classes.logo, { [classes.logoActive]: index === i })}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </Container>
  )
}

export default AboutTestimonials

export interface Testimonial {
  node: {
    backgroundColor: string
    companyLogo: {
      file: {
        url: string
      }
    }
    personName: string
    personTitle: string
    quote: string
    textColor: string
    id: string
  }
}
