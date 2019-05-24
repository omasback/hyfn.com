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
  { name: 'HyfnLogo' }
)

interface Props extends React.SVGAttributes<{}> {
  color?: string
}

const HyfnLogo: React.FunctionComponent<Props> = props => {
  const classes = useStyles()

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 222 58"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        className={classes.path}
        d="M80,81v58H302V81H80Zm66.953,38.168h-6v-7.08h-16.7v7.08h-6v-18.33h6v7.075h16.7v-7.075h6v18.33Zm40.116-17.847-12.118,11.564v6.278h-6v-6.278l-12.264-11.7,0.3-.342h6.5l8.476,8.268,8.5-8.268h6.468l0.3,0.342Zm35.835,3.692H202.956v2.924h18.68v4.1h-18.68v7.129h-6v-18.33h25.95v4.175Zm40.847,14.155h-6.69l-16.907-12.425v12.425h-6v-18.33h6.119l0.072,0.052,17.406,12.739V100.838h6v18.33Z"
        transform="translate(-80 -81)"
      />
    </svg>
  )
}

export default HyfnLogo
