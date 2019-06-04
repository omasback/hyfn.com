import * as React from 'react'
import HomepageHero from 'components/pages/home/HomepageHero.js'
import HomepageIntro from 'components/pages/home/HomepageIntro'
import HomepageVideo from 'components/pages/home/HomepageVideo'
import HompageCaseStudies from 'components/pages/home/HomepageCaseStudies'
import { graphql } from 'gatsby'
import { ICaseStudyLink } from 'components/pages/case-studies/CaseStudyLink'

const Homepage: React.FunctionComponent<HomepageProps> = props => {
  const { contentfulHomePage } = props.data

  return (
    <div>
      <HomepageHero />
      <HomepageIntro />
      <HomepageVideo />
      <HompageCaseStudies caseStudyLinks={contentfulHomePage.caseStudyLinks} />
    </div>
  )
}

export default Homepage

interface HomepageProps {
  data: {
    contentfulHomePage: {
      caseStudyLinks: ICaseStudyLink[]
    }
  }
}

export const pageQuery = graphql`
  query MyQuery {
    contentfulHomePage(slug: { eq: "home" }) {
      caseStudyLinks {
        linkTitle
        linkTextColor
        linkSummary
        linkBackgroundColor
        slug
        linkImage {
          file {
            url
          }
        }
      }
    }
  }
`
