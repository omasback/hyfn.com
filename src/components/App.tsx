import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { create } from 'jss'
import extend from 'jss-plugin-extend'
import { StylesProvider, jssPreset } from '@material-ui/styles'

import GlobalStyles from './GlobalStyles'
import PageWrapper from './page-wrapper/PageWrapper'
import Styleguide from './pages/Styleguide'
import Homepage from './pages/home/Homepage'
import CaseStudy from './pages/case-studies/CaseStudy'

const jss = create({
  plugins: [extend(), ...jssPreset().plugins],
})

class App extends Component {
  render() {
    return (
      <StylesProvider jss={jss}>
        <Router>
          <PageWrapper>
            <Switch>
              <Route path="/styleguide" component={Styleguide} />
              <Route path="/" component={Homepage} exact />
              <Route path="/works/:slug" component={CaseStudy} exact />
            </Switch>
          </PageWrapper>
          <GlobalStyles />
        </Router>
      </StylesProvider>
    )
  }
}

export default App
