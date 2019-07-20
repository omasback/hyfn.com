import React, { Component } from 'react'
import { create } from 'jss'
import extend from 'jss-plugin-extend'
import merge from 'lodash/merge'
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import GlobalStyles from 'components/GlobalStyles'
import PageWrapper from 'components/page-wrapper/PageWrapper'
import ErrorBoundary from 'components/ErrorBoundary'
import constants from 'styles/constants'

export interface Theme extends MuiTheme {
  color: string
  backgroundColor: string
  setTheme: (color?: string, backgroundColor?: string) => void
}

const jss = create({
  plugins: [extend(), ...jssPreset().plugins],
})

const defaultTheme = createMuiTheme()

@observer
class App extends Component<{ pageContext: any }> {
  @observable
  color = constants.colors.darkGray

  @observable
  backgroundColor = constants.colors.lightGray

  @action
  setTheme = (
    color: string = constants.colors.darkGray,
    backgroundColor: string = constants.colors.lightGray
  ) => {
    if (typeof window !== 'undefined') {
      window.setTimeout(() => {
        this.color = color
        this.backgroundColor = backgroundColor
      }, 100)
    }
  }

  render() {
    return (
      <ErrorBoundary>
        <ThemeProvider
          theme={merge({}, defaultTheme, {
            color: this.color,
            backgroundColor: this.backgroundColor,
            setTheme: this.setTheme,
          })}
        >
          <StylesProvider jss={jss}>
            <GlobalStyles />
            {this.props.pageContext.layout === 'noNav' ? (
              this.props.children
            ) : (
              <PageWrapper>{this.props.children}</PageWrapper>
            )}
          </StylesProvider>
        </ThemeProvider>
      </ErrorBoundary>
    )
  }
}

export default App

// CRA App code
// import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { create } from 'jss'
// import extend from 'jss-plugin-extend'
// import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/styles'
// import { observer } from 'mobx-react'
// import { ScrollContext } from 'react-router-scroll-4'

// import GlobalStyles from './GlobalStyles'
// import PageWrapper from './page-wrapper/PageWrapper'
// import Styleguide from './pages/Styleguide'
// import Homepage from './pages/home/Homepage'
// import CaseStudiesIndex from './pages/case-studies/CaseStudiesIndex'
// import CaseStudy from './pages/case-studies/CaseStudy'
// import About from './pages/about/About'
// import { observable, action } from 'mobx'
// import constants from 'styles/constants'

// const jss = create({
//   plugins: [extend(), ...jssPreset().plugins],
// })

// export type Theme = {
//   color: string
//   backgroundColor: string
//   setTheme: (color?: string, backgroundColor?: string) => void
// }

// @observer
// class App extends Component {
//   @observable
//   color = constants.colors.darkGray

//   @observable
//   backgroundColor = constants.colors.lightGray

//   @action
//   setTheme = (
//     color: string = constants.colors.darkGray,
//     backgroundColor: string = constants.colors.lightGray
//   ) => {
//     this.color = color
//     this.backgroundColor = backgroundColor
//   }

//   render() {
//     return (
//       <ThemeProvider
//         theme={{
//           color: this.color,
//           backgroundColor: this.backgroundColor,
//           setTheme: this.setTheme,
//         }}
//       >
//         <StylesProvider jss={jss}>
//           <Router>
//             <ScrollContext>
//               <PageWrapper>
//                 <Switch>
//                   <Route path="/styleguide" component={Styleguide} />
//                   <Route path="/" component={Homepage} exact />
//                   <Route path="/work" component={CaseStudiesIndex} exact />
//                   <Route path="/work/:slug" component={CaseStudy} exact />
//                   <Route path="/about" component={About} exact />
//                 </Switch>
//                 <GlobalStyles />
//               </PageWrapper>
//             </ScrollContext>
//           </Router>
//         </StylesProvider>
//       </ThemeProvider>
//     )
//   }
// }

// export default App
