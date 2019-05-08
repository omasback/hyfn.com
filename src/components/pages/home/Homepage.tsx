import * as React from 'react'
import HomepageHero from './HomepageHero'
import HomepageIntro from './HomepageIntro'

interface Props {}

const Homepage: React.FunctionComponent<Props> = () => (
  <div>
    <HomepageHero />
    <HomepageIntro />
  </div>
)

export default Homepage
