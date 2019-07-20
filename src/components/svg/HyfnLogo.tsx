import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from 'layouts'
import constants from 'styles/constants'

const useStyles = makeStyles<Theme>(
  theme => ({
    path: {
      transition: `fill ${constants.themeTransitionDuration}`,
      fill: theme.color,
    },
  }),
  { name: 'Mui-HyfnLogo' }
)

interface Props extends React.SVGAttributes<{}> {
  color?: string
}

const HyfnLogo: React.FunctionComponent<Props> = props => {
  const classes = useStyles()

  const { color, ...restProps } = props

  return (
    <svg
      {...restProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 395.5 147.68"
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        <g className={classes.path} style={{ fill: color ? color : undefined }}>
          <path d="M7.54,139.28v8.21h-3V135.94H7.7l9.94,8.45v-8.45h3v11.55H17.16Z" />
          <path d="M35.39,135.94H49.54v2.35H38.44v2.27h10.4v2.29H38.44v2.29h11.1v2.35H35.39Z" />
          <path d="M70.57,143.38l-4.41,4.11H62.55l0-.06,6.19-5.8-6-5.63.05-.06h3.65l4.22,3.93,4.23-3.93h3.62l0,.06-6,5.62,6.22,5.81,0,.06H75Z" />
          <path d="M91.76,146.71v-2.56l.1-.05a20.78,20.78,0,0,0,7.62,1.18c3.39,0,4.83-.54,4.83-1.33,0-2.32-12.61.74-12.61-4.73,0-2.37,2.61-3.62,7.6-3.62a24,24,0,0,1,6.9.93V139l-.09,0a23.85,23.85,0,0,0-6.74-1c-3.25,0-4.63.4-4.63,1.12,0,2.32,12.61-.64,12.61,4.75,0,2.65-2.35,3.81-8,3.81A26.17,26.17,0,0,1,91.76,146.71Z" />
          <path d="M130.05,138.29v9.2h-3v-9.2h-6.78v-2.35h16.63v2.35Z" />
          <path d="M159.88,145.17h-8.16l-1.44,2.32H147l7.36-11.55h3.14l7,11.55h-3.27Zm-4-6.79-2.75,4.44h5.34Z" />
          <path d="M185.62,143.73H181v3.76h-3V135.94h8.9c3.87,0,6,1.37,6,3.9,0,2-1.34,3.28-3.81,3.71l4.18,3.88-.05.06H189.5ZM181,138.34v3h5.78c2,0,3.07-.32,3.07-1.49s-1-1.5-3.07-1.5Z" />
          <path d="M224.63,135.94h8.19c5.22,0,8.36,2.12,8.36,5.77s-3.16,5.78-8.25,5.78h-8.3Zm3,2.4v6.75h5c3.55,0,5.41-1,5.41-3.38s-1.86-3.37-5.41-3.37Z" />
          <path d="M255.25,135.94h3v11.55h-3Z" />
          <path d="M281.4,147.68c-5.69,0-9-2.22-9-6s3.33-6,8.85-6a14.51,14.51,0,0,1,6.89,1.57v2.6H288a13.54,13.54,0,0,0-6.5-1.77c-4,0-6.1,1.36-6.1,3.65s2.07,3.61,6.1,3.61a12.33,12.33,0,0,0,3.54-.53v-2.09h-6.9v-2h9.94v5.44A13.68,13.68,0,0,1,281.4,147.68Z" />
          <path d="M302.82,135.94h3v11.55h-3Z" />
          <path d="M329.45,138.29v9.2H326.4v-9.2h-6.78v-2.35h16.63v2.35Z" />
          <path d="M359.27,145.17h-8.16l-1.44,2.32H346.4l7.37-11.55h3.13l7,11.55h-3.27Zm-4-6.79-2.75,4.44h5.34Z" />
          <path d="M377.49,135.94h3v9.2H391v2.35H377.49Z" />
          <path d="M0,0V120H395.5V0ZM119.48,79.18H108.39V64.53H79V79.18H67.94V40.85H79V55.49h29.36V40.85h11.09Zm49.89-13.12V79.18H158.28V66.06L136.37,41.77l.69-.92h11.76l15,17,15.06-17h11.7l.7.92Zm85.42-16.17H219.25v5.65h33.29v8.89H219.25V79.18H208.16V40.85h46.63Zm72.77,29.29H315.37L285.52,53.7V79.18H274.43V40.85H285.6l30.87,26.24V40.85h11.09Z" />
        </g>
      </g>
    </svg>
  )
}

export default HyfnLogo
