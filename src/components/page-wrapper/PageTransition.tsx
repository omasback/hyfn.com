import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { SwitchTransition, Transition } from 'react-transition-group'
import { Location } from '@reach/router'

import { Theme } from 'layouts'

const timeout = 200

const useStyles = makeStyles<Theme>(
  theme => ({
    entering: {
      position: `absolute`,
      width: '100%',
      opacity: 1,
    },
    entered: {
      transition: `opacity ${timeout}ms`,
      opacity: 1,
    },
    exiting: {
      transition: `opacity ${timeout}ms`,
      opacity: 0,
    },
  }),
  { name: 'Mui-PageTransition' }
)

const PageTransition: React.FunctionComponent<{}> = props => {
  const classes = useStyles(props)

  const { children } = props
  return (
    <Location>
      {({ location }) => {
        return (
          <SwitchTransition mode={'in-out'}>
            <Transition
              key={location.pathname}
              timeout={{
                enter: timeout,
                exit: timeout,
              }}
            >
              {status => <div className={classes[status]}>{children}</div>}
            </Transition>
          </SwitchTransition>
        )
      }}
    </Location>
  )
}

export default PageTransition
