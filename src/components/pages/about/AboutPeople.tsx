import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Container from 'components/display/Container'
import constants from 'styles/constants'
import { responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import AboutPerson from './AboutPerson'

export interface Person {
  name: string
  title: string
  image: string
}

const people: Person[] = [
  {
    name: 'Jim Bob',
    title: 'Regional Manager',
    image: 'http://via.placeholder.com/280x350',
  },
  {
    name: 'Joey Jo Jo',
    title: 'Assistant Regional Manager',
    image: 'http://via.placeholder.com/280x350',
  },
  {
    name: 'Mary Sue',
    title: 'Assistant to the Regional Manager',
    image: 'http://via.placeholder.com/280x350',
  },
  {
    name: 'Billy Idol',
    title: 'Creative Director',
    image: 'http://via.placeholder.com/280x350',
  },
  {
    name: 'Ving Rames',
    title: 'Senior Developer',
    image: 'http://via.placeholder.com/280x350',
  },
  {
    name: 'Lady Elaine',
    title: 'Puppet',
    image: 'http://via.placeholder.com/280x350',
  },
  {
    name: 'Scott Burton',
    title: 'CTO',
    image: 'http://via.placeholder.com/280x350',
  },
]

const timeout = 1000

const useStyles = makeStyles(
  {
    root: {
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
  { name: 'AboutPeople' }
)

interface Props {}

const AboutPeople: React.FunctionComponent<Props> = ({ children }) => {
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
        <OffsetHeadline line1="OUR" line2="CREW" />
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
