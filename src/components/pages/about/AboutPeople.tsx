import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Container from 'components/display/Container'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import AboutPerson, { Person } from './AboutPerson'
import ThemeSetter from 'components/display/ThemeSetter'

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
    people: {
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
  },
  { name: 'Mui-AboutPeople' }
)

const AboutPeople: React.FunctionComponent<{ people: Person[] }> = ({
  people,
}) => {
  const classes = useStyles()
  const [index, setIndex] = React.useState(0)
  const nextIndex = (index + 4) % people.length
  let fourPeople = people.slice(index, index + 4)

  if (fourPeople.length < 4) {
    const moreNeeded = 4 - fourPeople.length
    const morePeople = people.slice(0, moreNeeded)
    fourPeople = fourPeople.concat(morePeople)
  }

  return (
    <>
      <Container className={classes.root}>
        <ThemeSetter
          color={constants.colors.darkGray}
          backgroundColor={constants.colors.lightGray}
          parent={'AboutPeople'}
        />
        <OffsetHeadline text="OUR\nCREW" />
        <div className={classes.people}>
          {fourPeople.map((person, i) => (
            <AboutPerson
              key={i}
              person={person}
              index={i}
              onClick={() => setIndex(nextIndex)}
            />
          ))}
        </div>
      </Container>
    </>
  )
}

export default AboutPeople
