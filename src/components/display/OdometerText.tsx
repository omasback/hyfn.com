import * as React from 'react'
import * as cx from 'classnames'
import { useInView } from 'react-intersection-observer'
import easings from 'easings-css'
import { makeStyles } from '@material-ui/styles'

import constants from 'styles/constants'

const useStyles = makeStyles(
  {
    root: {
      padding: 0,
      whiteSpace: 'nowrap',
    },
    character: {
      overflow: 'hidden',
      display: 'inline-block',
    },
    innerCharacter: {
      transform: 'translateY(100%)',
      display: 'block',
    },
    innerCharacterIn: {
      transform: 'none',
      transition: 'all 1.5s',
      transitionTimingFunction: easings.easeOutQuint,
    },
  },
  { name: 'OdometerText' }
)

const OdometerText: React.FunctionComponent<{
  text: string
  className: string
}> = ({ text, className }) => {
  const classes = useStyles()
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: constants.triggerOnce,
  })

  const characters = text.split('')

  return (
    <div className={cx(classes.root, className)} ref={ref}>
      {characters.map((character, i) => (
        <span key={character + i} className={classes.character}>
          <span
            className={cx(classes.innerCharacter, {
              [classes.innerCharacterIn]: inView,
            })}
            style={{ transitionDelay: `${0.05 * i}s` }}
          >
            {character}
          </span>
        </span>
      ))}
    </div>
  )
}

export default OdometerText
