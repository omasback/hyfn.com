import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import ModeratBoldWoff from 'fonts/Moderat-Bold.woff'
import ModeratMediumWoff from 'fonts/Moderat-Medium.woff'
import ModeratLightWoff from 'fonts/Moderat-Light.woff'
import { responsiveLengths } from 'styles/mixins'

import 'slick-carousel/slick/slick.css'
import constants from 'styles/constants'

// Using theme so toggle global color and background-color
// on the body was glitchy for some reason.
// Keep theme changes in PageWrapper
const useStyles = makeStyles({
  '@font-face': [
    {
      fontFamily: 'Moderat',
      src: `url(${ModeratLightWoff})`,
      fontWeight: 'normal',
    },
    {
      fontFamily: 'Moderat',
      src: `url(${ModeratMediumWoff})`,
      fontWeight: '600',
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
    ':-webkit-autofill, :-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active': {
      // http://webagility.com/posts/the-ultimate-list-of-hacks-for-chromes-forced-yellow-background-on-autocompleted-inputs
      WebkitTransitionDelay: '99999s',
    },
    html: {
      // react-responsive-modal scroll lock only works with html scrolling
      // height: "100%",
    },
    body: {
      height: '100%',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      overflowY: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      overscrollBehaviorX: 'none',
      fontFamily: 'Moderat, sans-serif',
      backgroundColor: constants.colors.lightGray,
      color: constants.colors.darkGray,
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
      extend: responsiveLengths('fontSize', 21, 38),
      margin: '0 0 0.5em',
    },
    p: {
      extend: responsiveLengths('fontSize', 14, 18),
      lineHeight: 1.6,
      margin: '0 0 1.7em 0',
    },
    a: {
      color: 'unset',
    },
  },
})

const GlobalStyles: React.FunctionComponent<{}> = () => {
  useStyles()
  return null
}

export default GlobalStyles
