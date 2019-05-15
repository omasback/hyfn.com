import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import ModeratBoldWoff from 'fonts/Moderat-Bold.woff'
import ModeratLightWoff from 'fonts/Moderat-Light.woff'
import theme from 'styles/theme'
import { responsiveLengths } from 'styles/helpers'

const useStyles = makeStyles({
  '@font-face': [
    {
      fontFamily: 'Moderat',
      src: `url(${ModeratLightWoff})`,
      fontWeight: 'normal',
    },
    {
      fontFamily: 'Moderat',
      src: `url(${ModeratBoldWoff})`,
      fontWeight: 'bold',
    },
  ] as any, // TODO: check if bug fixed in jss alpha
  '@global': {
    '*, :before, :after': {
      boxSizing: 'border-box',
    },
    'input, textarea, select, button': {
      fontFamily: 'Moderat, sans-serif',
    },
    html: {
      // react-responsive-modal scroll lock only works with html scrolling
      // height: "100%",
    },
    body: {
      height: '100%',
      backgroundColor: theme.colors.lightGray,
      color: theme.colors.darkGray,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      overflowY: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      overscrollBehaviorX: 'none',
      fontFamily: 'Moderat, sans-serif',
    },
    '#root': {
      width: '100%',
      overflow: 'hidden',
    },
    h1: {
      extend: responsiveLengths('fontSize', 70, 180),
      lineHeight: 0.9,
      fontWeight: 'bold',
      margin: 0,
      textIndent: '-.02em',
    },
    h2: {
      extend: responsiveLengths('fontSize', 40, 100),
      lineHeight: 0.9,
      fontWeight: 'bold',
      margin: 0,
    },
    h3: {
      fontSize: 38,
      margin: 0,
    },
    p: {
      extend: responsiveLengths('fontSize', 14, 18),
      lineHeight: 1.6,
      margin: '0 0 1.7em 0',
    },
  },
})

const GlobalStyles: React.FunctionComponent<{}> = () => {
  useStyles()
  return null
}

export default GlobalStyles
