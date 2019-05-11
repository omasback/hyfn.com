import * as React from 'react'
import * as cx from 'classnames'
import { useInView } from 'react-intersection-observer'
import easings from 'easings-css'
import { makeStyles } from '@material-ui/styles'

import theme from 'styles/theme'

const useStyles = makeStyles(
  {
    root: {
      padding: 0,
      overflow: 'hidden',
    },
    character: {
      display: 'inline-block',
      transform: 'translateY(100%)',
    },
    characterIn: {
      transform: 'none',
      transition: 'transform 1.5s',
      transitionTimingFunction: easings.easeOutQuint,
    },
    innerCharacter: {},
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
    triggerOnce: theme.triggerOnce,
  })

  const characters = text.split('')

  return (
    <div className={cx(classes.root, className)} ref={ref}>
      {characters.map((character, i) => (
        <span
          key={character + i}
          className={cx(classes.character, {
            [classes.characterIn]: inView,
          })}
          style={{ transitionDelay: `${0.05 * i}s` }}
        >
          <span className={classes.innerCharacter}>{character}</span>
        </span>
      ))}
    </div>
  )
}

export default OdometerText
