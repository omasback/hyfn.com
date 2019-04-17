import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import GlobalStyles from './GlobalStyles'
import Styleguide from './pages/Styleguide'
import Homepage from './pages/home/Homepage'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header" />
          <Route path="/styleguide" component={Styleguide} />
          <Route path="/" component={Homepage} exact />
        </div>
        <GlobalStyles />
      </Router>
    )
  }
}

export default App
