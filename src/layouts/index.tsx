import React, { Component } from 'react'
import { create } from 'jss'
import extend from 'jss-plugin-extend'
import merge from 'lodash/merge'
import { StylesProvider, jssPreset, ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme'

import GlobalStyles from 'components/GlobalStyles'
import PageWrapper from 'components/page-wrapper/PageWrapper'
import ErrorBoundary from 'components/ErrorBoundary'
import constants from 'styles/constants'
import { ScrollProvider } from 'components/page-wrapper/ScrollContext'

export interface Theme extends MuiTheme {
  color: string
  backgroundColor: string
  setTheme: (theme: { color?: string; backgroundColor?: string }) => void
}

const jss = create({
  plugins: [extend(), ...jssPreset().plugins],
})

const defaultTheme = createMuiTheme()

interface ILayoutprops {
  pageContext: any
}

const Layout: React.FunctionComponent<ILayoutprops> = ({
  pageContext,
  children,
}) => {
  const [theme, setTheme] = React.useState({
    color: constants.colors.darkGray,
    backgroundColor: constants.colors.lightGray,
  })

  return (
    <ErrorBoundary>
      <ThemeProvider theme={merge({ setTheme }, defaultTheme, theme)}>
        <StylesProvider jss={jss}>
          <ScrollProvider>
            <GlobalStyles />
            {pageContext.layout === 'noNav' ? (
              children
            ) : (
              <PageWrapper>{children}</PageWrapper>
            )}
          </ScrollProvider>
        </StylesProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default Layout
