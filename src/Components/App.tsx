import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import GlobalStyles from './GlobalStyles'
import Styleguide from './pages/Styleguide'
import Homepage from './pages/home/Homepage'
import PageWrapper from './page-wrapper/PageWrapper'

class App extends Component {
  render() {
    return (
      <Router>
        <PageWrapper>
          <Switch>
            <Route path="/styleguide" component={Styleguide} />
            <Route path="/" component={Homepage} exact />
          </Switch>
        </PageWrapper>
        <GlobalStyles />
      </Router>
    )
  }
}

export default App
