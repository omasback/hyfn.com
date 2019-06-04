import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'

import ArrowLink from 'components/display/ArrowLink'
import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import OffsetHeadline from 'components/display/OffsetHeadline'
import CaseStudyLink, {
  ICaseStudyLink,
} from 'components/pages/case-studies/CaseStudyLink'
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
  { name: 'HomepageCaseStudies' }
)

const HomepageCaseStudies: React.FunctionComponent<
  HomepageCaseStudiesProps
> = props => {
  const classes = useStyles()

  const { caseStudyLinks } = props

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
      {caseStudyLinks.map((work, i) => (
        <CaseStudyLink
          key={work.slug}
          title={work.linkTitle}
          image={work.linkImage.file.url}
          description={work.linkSummary}
          url={`work/${work.slug}`}
          color={work.linkTextColor}
          backgroundColor={work.linkBackgroundColor}
          number={i}
          rowReverse={!!(i % 2)}
        />
      ))}
    </Container>
  )
}

export default HomepageCaseStudies

interface HomepageCaseStudiesProps {
  caseStudyLinks: ICaseStudyLink[]
}
