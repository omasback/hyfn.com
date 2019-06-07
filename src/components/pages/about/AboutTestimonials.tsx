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

const timeout = 1000

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
    testimonials: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 1,
      extend: merge(
        responsiveLengths('marginLeft', 0, -50),
        responsiveLengths('marginRight', 0, -50)
      ),
    },
    testimonial: {
      opacity: 1,
      transition: 'opacity 0.3s',
    },
    enter: { opacity: 0 },
    enterActive: { opacity: 1 },
    exitActive: {
      opacity: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
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
      extend: merge(
        responsiveLengths('maxHeight', 70, 70),
        responsiveLengths('marginLeft', 40, 40),
        responsiveLengths('marginRight', 40, 40)
      ),
    },
  },
  { name: 'AboutPeople' }
)

const AboutTestimonials: React.FunctionComponent<{
  testimonials: Testimonial[]
}> = ({ testimonials }) => {
  const classes = useStyles()

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
          <div className={classes.relative}>
            <TransitionGroup component={null}>
              <CSSTransition
                key={testimonial.id}
                timeout={500}
                classNames={{
                  enter: classes.enter,
                  enterActive: classes.enterActive,
                  exitActive: classes.exitActive,
                }}
              >
                <div className={classes.testimonial} key={testimonial.id}>
                  <p className={classes.quote}>{testimonial.quote}</p>
                  <p className={classes.person}>
                    <b>{testimonial.personName}</b>
                    <br />
                    {testimonial.personTitle}
                  </p>
                </div>
              </CSSTransition>
            </TransitionGroup>
          </div>
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
            className={classes.logo}
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
