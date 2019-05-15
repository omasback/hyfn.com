import * as React from 'react'
import HomepageHero from './HomepageHero'
import HomepageIntro from './HomepageIntro'
import HomepageVideo from './HomepageVideo'
import HompageProjects from './HomepageProjects'

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
