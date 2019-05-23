import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'

import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import OffsetHeadline from 'components/display/OffsetHeadline'
import CaseStudyLink from 'components/pages/case-studies/CaseStudyLink'
import { responsiveLengths } from 'styles/mixins'

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
    url: '/works/new-balance',
    image: 'http://via.placeholder.com/488x629',
  },
  {
    title: 'Skyzone',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '/works/skyzone',
    image: 'http://via.placeholder.com/488x629',
  },
  {
    title: 'Vita Coco',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '/works/vita-coco',
    image: 'http://via.placeholder.com/488x629',
  },
]

const HompageProjects: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <div className={classes.headlineAndLink}>
        <OffsetHeadline
          line1="LOOK"
          line2="PROOF!"
          className={classes.headline}
        />
        <ScrollReveal>
          <ArrowLink
            to="/works"
            text={'We Do Work That Works'}
            className={classes.cta}
          />
        </ScrollReveal>
      </div>
      {works.map((work, i) => (
        <CaseStudyLink
          key={work.url}
          title={work.title}
          image={work.image}
          description={work.description}
          url={work.url}
          number={i}
          rowReverse={!!(i % 2)}
        />
      ))}
    </Container>
  )
}

export default HompageProjects
