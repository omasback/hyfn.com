import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'

import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import OffsetHeadline from 'components/display/OffsetHeadline'
import CaseStudyLink from 'components/pages/case-studies/CaseStudyLink'
import { responsiveLengths, largeParagraph } from 'styles/mixins'
import Grid from 'components/display/Grid'
import ThemeSetter from 'components/display/ThemeSetter'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('paddingTop', 80, 140),
        responsiveLengths('paddingBottom', 116, 140)
      ),
    },
    top: {
      position: 'relative',
    },
    introText: {
      extend: largeParagraph,
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
    url: '/work/new-balance',
    image: 'http://via.placeholder.com/488x629',
    color: '#ffffff',
    backgroundColor: '#1bac99',
  },
  {
    title: 'Skyzone',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '/work/skyzone',
    image: 'http://via.placeholder.com/488x629',
    color: '#ffffff',
    backgroundColor: '#ef5b2f',
  },
  {
    title: 'Vita Coco',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    url: '/work/vita-coco',
    image: 'http://via.placeholder.com/488x629',
    color: '#ffffff',
    backgroundColor: '#1a428a',
  },
]

const HompageProjects: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container className={classes.top}>
        <ThemeSetter />
        <Grid item mobile={8} desktop={6} className={classes.introText}>
          <ScrollReveal>
            Here’s an assortment of things we have done in the past. Since it’s
            the Internet, we can always find place for one more, so why don’t
            you let us know what it will be?
          </ScrollReveal>
        </Grid>

        <Grid item mobile={10}>
          <OffsetHeadline line1="WORKS" className={classes.headline} />
        </Grid>
      </Grid>
      {works.map((work, i) => (
        <CaseStudyLink
          key={work.url}
          title={work.title}
          image={work.image}
          description={work.description}
          url={work.url}
          color={work.color}
          backgroundColor={work.backgroundColor}
          number={i}
          rowReverse={!!(i % 2)}
        />
      ))}
    </Container>
  )
}

export default HompageProjects
