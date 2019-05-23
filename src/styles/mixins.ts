import theme from 'styles/theme'
import { CSSProperties } from 'react'
import merge from 'lodash/merge'

const responsiveLengths = (
  property: keyof CSSProperties,
  mobilePixels: number,
  desktopPixels: number
) => ({
  [property]: ((mobilePixels / 375) * 100).toFixed(2) + 'vw',
  '@media (width: 375px)': {
    [property]: mobilePixels,
  },
  [theme.mq.desktop]: {
    [property]: ((desktopPixels / 1440) * 100).toFixed(2) + 'vw',
  },
  '@media (min-width: 1440px)': {
    [property]: desktopPixels,
  },
})

const bleedLeft = responsiveLengths('marginLeft', 0, -150)

const bleedRight = responsiveLengths('marginRight', 0, -150)

const largeParagraph = merge(
  { lineHeight: 1.6 },
  responsiveLengths('fontSize', 17, 28)
)

export { responsiveLengths, bleedLeft, bleedRight, largeParagraph }
