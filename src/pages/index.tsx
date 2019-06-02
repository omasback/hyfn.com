import * as React from 'react'
import HomepageHero from 'components/pages/home/HomepageHero.js'
import HomepageIntro from 'components/pages/home/HomepageIntro'
import HomepageVideo from 'components/pages/home/HomepageVideo'
import HompageProjects from 'components/pages/home/HomepageCaseStudies'

interface Props {}

const Homepage: React.FunctionComponent<Props> = () => (
  <div>
    {typeof window !== 'undefined' && <HomepageHero />}
    <HomepageIntro />
    <HomepageVideo />
    <HompageProjects />
  </div>
)

export default Homepage
