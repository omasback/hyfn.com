import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { create } from 'jss'
import extend from 'jss-plugin-extend'
import { StylesProvider, jssPreset } from '@material-ui/styles'

import GlobalStyles from './GlobalStyles'
import PageWrapper from './page-wrapper/PageWrapper'
import Styleguide from './pages/Styleguide'
import Homepage from './pages/home/Homepage'
import CaseStudiesIndex from './pages/case-studies/CaseStudiesIndex'
import CaseStudy from './pages/case-studies/CaseStudy'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import theme from 'styles/theme'

const jss = create({
  plugins: [extend(), ...jssPreset().plugins],
})

type Theme = {
  color?: string
  backgroundColor?: string
  setTheme: (color?: string, backgroundColor?: string) => void
}

export const ThemeContext = React.createContext<Theme>({
  color: theme.colors.darkGray,
  backgroundColor: 'e8e8e8',
  setTheme: () => {},
})

@observer
class App extends Component {
  @observable
  color = theme.colors.darkGray

  @observable
  backgroundColor = '#e8e8e8'

  @action
  setTheme = (
    color: string = theme.colors.darkGray,
    backgroundColor: string = '#e8e8e8'
  ) => {
    this.color = color
    this.backgroundColor = backgroundColor
  }

  render() {
    return (
      <ThemeContext.Provider
        value={{
          color: this.color,
          backgroundColor: this.backgroundColor,
          setTheme: this.setTheme,
        }}
      >
        <StylesProvider jss={jss}>
          <Router>
            <PageWrapper>
              <Switch>
                <Route path="/styleguide" component={Styleguide} />
                <Route path="/" component={Homepage} exact />
                <Route path="/works" component={CaseStudiesIndex} exact />
                <Route path="/works/:slug" component={CaseStudy} exact />
              </Switch>
            </PageWrapper>
            <GlobalStyles />
          </Router>
        </StylesProvider>
      </ThemeContext.Provider>
    )
  }
}

export default App
