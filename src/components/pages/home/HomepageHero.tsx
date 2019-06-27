import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import { Link } from 'gatsby'
import easings from 'easings-css'

import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import { responsiveLengths, absoluteFill } from 'styles/mixins'
import constants from 'styles/constants'
import cardConfigs from './cardConfigs'
import HomepageHeroCard from './HomepageHeroCard'

const mobileCardTransform = 'translate3d(3.33vw, 3.37vw, -100px)'
const animationDuration = 450

const generateAnimations = (breakpoint: string, transform: string) => ({
  ['@keyframes tabPosition0' + breakpoint]: {
    '0%': {
      transform: transform,
    },
    '100%': {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  ['@keyframes tabPosition1' + breakpoint]: {
    '0%': {
      transform: transform + transform,
    },
    '100%': {
      transform: transform,
    },
  },
  ['@keyframes tabPosition2' + breakpoint]: {
    '0%': {
      transform: transform + transform + transform,
    },
    '100%': {
      transform: transform + transform,
    },
  },
  ['@keyframes tabPosition3' + breakpoint]: {
    '0%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '50%': {
      transform: 'translate3d(0, 0, 0)',
    },
    '50.1%': {
      transform:
        transform + transform + transform + 'translate3d(0, 0, -100px)',
    },
    '100%': {
      transform: transform + transform + transform,
    },
  },
})

const useStyles = makeStyles(
  {
    ...generateAnimations('Mobile', 'translate3d(3.33vw, 3.37vw, -100px)'),
    ...generateAnimations('Desktop', 'translate3d(2vh, 2vh, -100px)'),
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
    root: {
      extend: responsiveLengths([['marginBottom', 100, 100]]),
      height: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      animationName: '$fadeIn',
      animationDuration: animationDuration / 2 + 'ms',
      animationDelay: animationDuration / 2 + 'ms',
      animationFillMode: 'both',
      [constants.mq.desktop]: {
        flexDirection: 'row-reverse',
        height: 'calc(100vh - 250px)',
        paddingTop: 'calc(34vh - 250px)',
        textRendering: 'geometricPrecision',
      },
    },
    text: {
      flexBasis: '20%',
      [constants.mq.desktop]: {
        flexBasis: '50%',
        padding: '4vh 0 0 11%',
      },
    },
    intro: {
      extend: responsiveLengths([
        ['marginBottom', 30, 0],
        ['fontSize', 18, 36],
      ]),
      lineHeight: 1.5,
      marginBottom: 0,
      '& a': {
        fontWeight: 600,
        textDecoration: 'none',
      },
    },
    tabs: {
      position: 'relative',
      flexBasis: '80%',
      transformStyle: 'preserve-3d',
      extend: responsiveLengths('marginLeft', -38, 0),
      width: '90vw',
      [constants.mq.desktop]: {
        flexBasis: '50%',
      },
    },
    tab: {
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      overflow: 'hidden',
      animationDuration: animationDuration + 'ms',
      animationFillMode: 'both',
    },
    tabPosition0: {
      animationName: '$tabPosition0Mobile',
      animationDelay: animationDuration * 0.3 + 'ms',
      [constants.mq.desktop]: {
        animationName: '$tabPosition0Desktop',
      },
    },
    tabPosition1: {
      animationName: '$tabPosition1Mobile',
      animationDelay: animationDuration * 0.4 + 'ms',
      [constants.mq.desktop]: {
        animationName: '$tabPosition1Desktop',
      },
    },
    tabPosition2: {
      animationName: '$tabPosition2Mobile',
      animationDelay: animationDuration * 0.5 + 'ms',
      [constants.mq.desktop]: {
        animationName: '$tabPosition2Desktop',
      },
    },
    tabPosition3: {
      animationName: '$tabPosition3Mobile',
      [constants.mq.desktop]: {
        animationName: '$tabPosition3Desktop',
      },
    },
    tabDownUp: {
      extend: absoluteFill(),
    },
    '@keyframes downUp': {
      '0%': {
        transform: 'none',
      },
      '50%': {
        transform: 'translate(0, 110%)',
      },
      '100%': {
        transform: 'none',
      },
    },
    tabDownUp3: {
      animationName: '$downUp',
      animationDuration: animationDuration + 'ms',
    },
  },
  { name: 'HomepageHero' }
)

const HomepageHero: React.FunctionComponent<{}> = props => {
  const classes = useStyles(props)

  const [currentTab, setCurrentTab] = React.useState(0)
  const [isPaused, setPaused] = React.useState(false)
  const [timer, setTimer] = React.useState(0)

  React.useEffect(() => {
    if (isPaused) {
      clearInterval(timer)
    } else {
      const id = setInterval(() => {
        setCurrentTab(prevState => (prevState + 1) % cardConfigs.length)
      }, 5000)
      setTimer(id)
    }
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <Container className={classes.root}>
      <div className={classes.text}>
        <ScrollReveal>
          <p className={classes.intro}>
            We provide{' '}
            <Link to="/solutions/#Amplification" style={{ color: '#e5a624' }}>
              Amplification
            </Link>
            ,{' '}
            <Link
              to="/solutions/#Creative"
              style={{ color: constants.colors.blue }}
            >
              Creative
            </Link>
            , and{' '}
            <Link
              to="/solutions/#Technology"
              style={{ color: constants.colors.red }}
            >
              Technology
            </Link>{' '}
            solutions for our clients’ most pressing problems.
          </p>
        </ScrollReveal>
      </div>
      <div className={classes.tabs}>
        {cardConfigs.map((c, i) => (
          <div
            key={i}
            className={cx(
              classes.tab,
              classes[
                'tabPosition' +
                  ((cardConfigs.length + i - currentTab) % cardConfigs.length)
              ]
            )}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchEnd={() => setPaused(false)}
          >
            <div
              className={cx(
                classes.tabDownUp,
                classes[
                  'tabDownUp' +
                    ((cardConfigs.length + i - currentTab) % cardConfigs.length)
                ]
              )}
            >
              <HomepageHeroCard
                key={c.title}
                i={i}
                open={currentTab === i}
                onArrowClick={() => {
                  setPaused(true)
                  setCurrentTab(prevTab => (prevTab + 1) % cardConfigs.length)
                }}
                {...c}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  )
}

export default HomepageHero
