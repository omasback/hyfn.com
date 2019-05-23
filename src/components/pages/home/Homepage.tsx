import * as React from 'react'
import HomepageHero from './HomepageHero.js'
import HomepageIntro from './HomepageIntro'
import HomepageVideo from './HomepageVideo'
import HompageProjects from './HomepageCaseStudies'

interface Props {}

const Homepage: React.FunctionComponent<Props> = () => (
  <div>
    <HomepageHero />
    <HomepageIntro />
    <HomepageVideo />
    <HompageProjects />
  </div>
)

export default Homepage
