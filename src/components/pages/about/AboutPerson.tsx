import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import {
  CSSTransition,
  TransitionGroup,
  Transition,
} from 'react-transition-group'

import constants from 'styles/constants'
import { responsiveLengths, absoluteFill } from 'styles/mixins'

const timeout = 800

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('width', 140, 280),
        responsiveLengths('height', 175, 450),
        responsiveLengths('marginBottom', 20, 0)
      ),
      position: 'relative',
      overflow: 'hidden',
      userSelect: 'none',
      '&:nth-child(1)': {
        extend: merge(responsiveLengths('top', -30, -90)),
      },
      '&:nth-child(2)': {
        extend: merge(responsiveLengths('top', 66, 80)),
      },
      '&:nth-child(3)': {
        extend: merge(responsiveLengths('top', -30, -220)),
      },
      '&:nth-child(4)': {
        extend: merge(responsiveLengths('top', 66, -60)),
      },
    },
    imageTransitionContainer: {
      extend: merge(responsiveLengths('height', 175, 350)),
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'ns-resize',
      [constants.mq.desktop]: {
        zIndex: 1,
      },
    },
    imageContainer: {
      extend: absoluteFill,
      transition: `transform ${timeout}ms`,
    },
    enterImgOdd: { transform: 'translateY(-100%)' },
    enterImgEven: { transform: 'translateY(100%)' },
    enterActiveImg: { transform: 'translateY(0)', pointerEvents: 'none' },
    exitActiveImgOdd: { transform: 'translateY(100%)' },
    exitActiveImgEven: { transform: 'translateY(-100%)' },
    hoverImage: {
      extend: absoluteFill,
      backgroundSize: 'cover',
      opacity: 0,
      transition: 'opacity 0.3s',
      '&:hover': {
        opacity: 1,
      },
    },
    image: {
      extend: absoluteFill,
      backgroundSize: 'cover',
      pointerEvents: 'none',
    },
    infoBg: {
      background: '#fff',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transform: 'translateY(100%)',
      transition: `transform ${timeout / 2}ms`,
      [constants.mq.desktop]: {
        height: 100,
        top: 'auto',
        bottom: 0,
        transform: 'translateY(-100%)',
      },
    },
    inforBgShowing: {
      transform: 'none',
    },
    info: {
      extend: merge(
        responsiveLengths('fontSize', 14, 18),
        responsiveLengths('padding', 14, 20)
      ),
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      lineHeight: '1.2',
    },
    textContainer: {
      overflow: 'hidden',
    },
    texts: {
      position: 'absolute',
    },
    text: {
      transform: 'translateY(-100%)',
      transition: `transform ${timeout / 2}ms`,
    },
    textEntered: {
      transform: 'none',
      transitionDelay: `${timeout * 0.2}ms`,
    },
    name: {
      fontWeight: 'bold',
      position: 'relative',
    },
    title: {
      position: 'relative',
    },
  },
  { name: 'AboutPerson' }
)

export interface Person {
  node: {
    id: string
    jobTitle: string
    name: string
    image: {
      file: {
        url: string
      }
    }
    hoverImage: {
      file: {
        url: string
      }
    }
  }
}

interface Props {
  person: Person
  index: number
  onClick: () => void
}

const AboutPerson: React.FunctionComponent<Props> = ({
  person,
  index,
  onClick,
}) => {
  const classes = useStyles()
  const ref = React.useRef<HTMLDivElement>(null)
  const [hover, setHover] = React.useState(false)

  // All this crap is necessary because of a react bug (?):
  // https://github.com/facebook/react/issues/9809
  React.useEffect(() => {
    const handleTouchstart = (event: TouchEvent) => {
      event.preventDefault()
      setHover(false)
    }

    const current = ref.current

    if (current) {
      current.addEventListener('touchend', handleTouchstart)
      return () => {
        current.removeEventListener('touchend', handleTouchstart)
      }
    }
  })

  return (
    <div
      ref={ref}
      className={classes.root}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      // onTouchEnd={() => setHover(false)} // see above
    >
      <div className={classes.imageTransitionContainer}>
        <TransitionGroup component={null}>
          <CSSTransition
            key={person.node.name}
            timeout={timeout}
            classNames={{
              enter: index % 2 ? classes.enterImgOdd : classes.enterImgEven,
              enterActive: classes.enterActiveImg,
              exitActive:
                index % 2
                  ? classes.exitActiveImgOdd
                  : classes.exitActiveImgEven,
            }}
          >
            <div className={classes.imageContainer}>
              <div
                style={{
                  backgroundImage: `url(${person.node.image.file.url || ''})`,
                }}
                className={classes.image}
              />
              {person.node.hoverImage && (
                <div
                  style={{
                    backgroundImage: `url(${person.node.hoverImage.file.url})`,
                  }}
                  className={classes.hoverImage}
                />
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className={classes.info}>
        <div
          className={cx(classes.infoBg, {
            [classes.inforBgShowing]: hover,
          })}
        />
        <TransitionGroup component={null}>
          <Transition key={person.node.name} timeout={timeout / 2}>
            {state => (
              <div className={classes.texts}>
                <div className={classes.textContainer}>
                  <div
                    className={cx(classes.name, classes.text, {
                      // [classes.textEntering]: state === 'entering' && hover,
                      [classes.textEntered]: state === 'entered' && hover,
                    })}
                  >
                    {person.node.name}
                  </div>
                </div>
                <div className={classes.textContainer}>
                  <div
                    className={cx(classes.title, classes.text, {
                      // [classes.textEntering]: state === 'entering' && hover,
                      [classes.textEntered]: state === 'entered' && hover,
                    })}
                  >
                    {person.node.jobTitle}
                  </div>
                </div>
              </div>
            )}
          </Transition>
        </TransitionGroup>
      </div>
    </div>
  )
}

export default AboutPerson
