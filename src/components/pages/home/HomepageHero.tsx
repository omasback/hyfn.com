import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import { Link } from 'gatsby'
import easings from 'easings-css'

import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import { responsiveLengths } from 'styles/mixins'
import constants from 'styles/constants'
import cardConfigs from './cardConfigs'
import HomepageHeroCard from './HomepageHeroCard'
import CircleArrow from 'components/svg/CircleArrow'

const useStyles = makeStyles(
  {
    root: {
      extend: responsiveLengths([['marginBottom', 100, 100]]),
      height: 'calc(100vh - 120px)',
      display: 'flex',
      flexDirection: 'column',
      [constants.mq.desktop]: {
        flexDirection: 'row-reverse',
        paddingTop: '12.7%',
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
        fontWeight: 'bold',
        textDecoration: 'none',
      },
    },
    tabs: {
      position: 'relative',
      flexBasis: '80%',
      [constants.mq.desktop]: {
        flexBasis: '50%',
      },
    },
    tab: {
      extend: responsiveLengths([['width', 338, 540]]),
      transition: 'transform 1s',
      transitionTimingFunction: easings.easeOutQuart,
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      '&:nth-child(1)': {
        extend: responsiveLengths([['left', -38, -30], ['top', 0, 0]]),
        zIndex: 4,
      },
      '&:nth-child(2)': {
        extend: responsiveLengths([['left', -25, -10], ['top', 18, 30]]),
        zIndex: 3,
      },
      '&:nth-child(3)': {
        extend: responsiveLengths([['left', -13, 10], ['top', 36, 60]]),
        zIndex: 2,
      },
      '&:nth-child(4)': {
        extend: responsiveLengths([['left', 0, 30], ['top', 54, 90]]),
        zIndex: 1,
      },
    },
    tabMoved: {
      transform: 'translate(-95%, 0)',
    },
    arrow: {
      position: 'absolute',
      zIndex: 5,
      cursor: 'pointer',
      extend: responsiveLengths([
        ['width', 60, 80],
        ['height', 60, 80],
        ['top', 340, 440],
        ['right', 30, 100],
      ]),
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
            <Link
              to="/solutions/#Amplification"
              style={{ color: constants.colors.yellow }}
            >
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
            solutions for our clients’ most pressing problems..
          </p>
        </ScrollReveal>
      </div>
      <div className={classes.tabs}>
        {cardConfigs.map((c, i) => (
          <div
            key={i}
            className={cx(classes.tab, {
              [classes.tabMoved]: currentTab > i,
            })}
            onClick={() => setCurrentTab(i)}
            onMouseEnter={() => {
              setPaused(true)
              setCurrentTab(i)
            }}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => {
              setPaused(true)
              setCurrentTab(i)
            }}
            onTouchEnd={() => {
              setPaused(false)
            }}
          >
            <HomepageHeroCard
              key={c.title}
              i={i}
              open={currentTab === i}
              {...c}
            />
          </div>
        ))}
        <CircleArrow
          className={classes.arrow}
          circleColor="rgba(0, 0, 0, 0.3)"
          arrowColor="#fff"
          onClick={() => {
            setPaused(true)
            setCurrentTab(prevTab => (prevTab + 1) % cardConfigs.length)
          }}
        />
      </div>
    </Container>
  )
}

export default HomepageHero
