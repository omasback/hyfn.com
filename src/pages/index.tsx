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
      <HomepageIntro cms={contentfulHomePage} />
      <HomepageVideo cms={contentfulHomePage.video} />
      <HompageCaseStudies caseStudyLinks={contentfulHomePage.caseStudyLinks} />
    </div>
  )
}

export default Homepage

export interface IHomepageData {
  caseStudyLinks: ICaseStudyLink[]
  slideshow1: Array<{ file: { url: string } }>
  slideshow2: Array<{ file: { url: string } }>
  slideshow3: Array<{ file: { url: string } }>
  video: { file: { url: string } }
}

interface HomepageProps {
  data: {
    contentfulHomePage: IHomepageData
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
      slideshow1 {
        file {
          url
        }
      }
      slideshow2 {
        file {
          url
        }
      }
      slideshow3 {
        file {
          url
        }
      }
      video {
        file {
          url
        }
      }
    }
  }
`
