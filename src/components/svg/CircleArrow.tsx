import * as React from 'react'
import constants from 'styles/constants'

interface Props extends React.SVGAttributes<{}> {
  circleColor?: string
  arrowColor?: string
}

const CircleArrow: React.FunctionComponent<Props> = props => {
  const { circleColor, arrowColor, ...restProps } = props

  return (
    <svg
      {...restProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 123 123"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx="61.5"
        cy="61.5"
        r="61.5"
        style={{
          fill: circleColor ? circleColor : '#fff',
          transition: `fill ${constants.themeTransitionDuration}`,
        }}
      />
      <path
        style={{
          fill: arrowColor ? arrowColor : '#000',
          transition: `fill ${constants.themeTransitionDuration}`,
        }}
        d="M558.672,1179.42l10.082,9.93h-29v4.59h28.9l-9.983,9.89,3.294,3.24,14.725-15.22v-0.5l-14.725-15.18Z"
        transform="translate(-497 -1129)"
      />
    </svg>
  )
}

export default CircleArrow
