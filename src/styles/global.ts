import { jss } from 'react-jss'

import ModeratBoldWoff from '../fonts/Moderat-Bold.woff'
import ModeratLightWoff from '../fonts/Moderat-Light.woff'
import theme from './theme'

const styles = {
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
  ],
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
      color: theme.colors.darkGray,
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      overflowY: 'auto',
      '-webkit-overflow-scrolling': 'touch',
      overscrollBehaviorX: 'none',
      fontFamily: 'Moderat, sans-serif',
    },
    h1: {
      fontSize: 210,
    },
    h2: {
      fontSize: 100,
    },
    h3: {
      fontSize: 38,
    },
  },
}

jss.createStyleSheet(styles, { meta: 'Global styles' }).attach()
