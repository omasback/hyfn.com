import constants from 'styles/constants'
import merge from 'lodash/merge'
import { CSSProperties } from '@material-ui/styles'

interface IRules {
  [x: string]: {
    [x: string]: string
  }
}

const responsiveLengthsRules = (
  property: keyof CSSProperties,
  mobilePixels: number,
  desktopPixels?: number
) => {
  const rules = {
    '@media (min-width: 0px)': {
      [property]: ((mobilePixels / 375) * 100).toFixed(2) + 'vw',
    },
    '@media (width: 375px)': {
      [property]: mobilePixels,
    },
  }

  if (typeof desktopPixels !== 'undefined') {
    rules[constants.mq.desktop] = {
      [property]: ((desktopPixels / 1440) * 100).toFixed(2) + 'vw',
    }
    rules['@media (min-width: 1440px)'] = {
      [property]: desktopPixels,
    }
  }

  return rules
}

type Args = [keyof CSSProperties, number, number?]

const responsiveLengths = (
  property: keyof CSSProperties | Args[],
  mobilePixels?: number,
  desktopPixels?: number
) => {
  if (Array.isArray(property)) {
    const rulesets = property.map(args =>
      responsiveLengthsRules.apply(null, args)
    )
    return merge(rulesets)
  } else if (typeof mobilePixels === 'undefined') {
    throw new Error(
      'responsiveLengths must be provided an array as first argument or mobilePixels as second argument'
    )
  } else {
    return responsiveLengthsRules(property, mobilePixels, desktopPixels)
  }
}

const bleedLeft = responsiveLengths('marginLeft', 0, -150)

const bleedRight = responsiveLengths('marginRight', 0, -150)

const largeParagraph = () =>
  merge({ lineHeight: 1.6 }, responsiveLengths('fontSize', 17, 28))

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
