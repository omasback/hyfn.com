import theme from 'styles/theme'
import { CSSProperties } from 'react'

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

export { responsiveLengths }
