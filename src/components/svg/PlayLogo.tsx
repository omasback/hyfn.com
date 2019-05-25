import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Theme } from 'components/App'
import constants from 'styles/constants'

const useStyles = makeStyles<Theme>(
  theme => ({
    path: {
      transition: `fill ${constants.themeTransitionDuration}`,
      fill: theme.color,
    },
  }),
  { name: 'PlayLogo' }
)

interface Props extends React.SVGAttributes<{}> {
  color?: string
}

const PlayLogo: React.FunctionComponent<Props> = props => {
  const classes = useStyles()

  const { color, ...restProps } = props

  return (
    <svg
      {...restProps}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 28"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        className={classes.path}
        style={{ fill: color ? color : undefined }}
        d="M8,0H1V12.22H4.91V8.33H8c3,0,4.87-1.63,4.87-4.28C12.88,1.57,11,0,8,0ZM7,5.75H4.91V2.63H7c1.17,0,1.79.54,1.79,1.55S8.15,5.75,7,5.75Zm11.32,6.47H28V9.12H22.18V0H18.29ZM10.5,28h4L9.68,15.77H4.86L0,28H4l.84-2.43h4.8ZM5.73,23.05l.83-2.42a10.27,10.27,0,0,0,.68-2.36h0A13.22,13.22,0,0,0,8,20.63l.83,2.42ZM21.33,28h3.9V23.88L30,15.77H25.93l-2.27,4.29a2.77,2.77,0,0,0-.34.88h0a2.56,2.56,0,0,0-.34-.88l-2.21-4.29H16.54l4.79,8.11V28Z"
      />
      />
    </svg>
  )
}

export default PlayLogo
