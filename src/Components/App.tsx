import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Styleguide from './Styleguide'
import Homepage from './Homepage'

// self-initting styles for non-react components
import '../styles/global'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header" />
          <Route path="/styleguide" component={Styleguide} />
          <Route path="/" component={Homepage} exact />
        </div>
      </Router>
    )
  }
}

export default App
