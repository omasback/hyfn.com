import constants from 'styles/constants'
import merge from 'lodash/merge'
import { CSSProperties } from '@material-ui/styles'

const responsiveLengths = (
  property: keyof CSSProperties,
  mobilePixels: number,
  desktopPixels: number
) => ({
  [property]: ((mobilePixels / 375) * 100).toFixed(2) + 'vw',
  '@media (width: 375px)': {
    [property]: mobilePixels,
  },
  [constants.mq.desktop]: {
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

const objectFitContain: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  minWidth: '1000%',
  minHeight: '1000%',
  transform: 'translate(-50%, -50%) scale(0.1)',
}

const absoluteFill: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}

export {
  responsiveLengths,
  bleedLeft,
  bleedRight,
  largeParagraph,
  objectFitContain,
  absoluteFill,
}
