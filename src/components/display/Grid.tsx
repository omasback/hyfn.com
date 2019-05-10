import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import theme from 'styles/theme'

interface Props {
  container?: boolean // if this is a parent of a grid item
  item?: boolean // if this is a child of a grid container (can be both container and child at the same time.)
  mobile?: number // number of columns (out of 10) it should span on mobile
  desktop?: number // number of columns (out of 10) it should span on desktop
  className?: string // for adding/overriding styles
}

const useStyles = makeStyles(
  {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'calc(100% + 10px)',
      margin: -5,
      [theme.mq.desktop]: {
        justifyContent: 'space-between',
        width: 'calc(100% + 20px)',
        margin: -10,
      },
      '& > $container': {
        margin: 0,
        padding: 0,
      },
    },
    item: {
      padding: 5,
      [theme.mq.desktop]: {
        padding: 10,
      },
    },
    width: (props: Props) => ({
      width: props.mobile ? props.mobile * 10 + '%' : 'auto',
      [theme.mq.desktop]: {
        width: props.desktop
          ? props.desktop * 10 + '%'
          : props.mobile
          ? props.mobile * 10 + '%'
          : 'auto',
      },
    }),
  },
  { name: 'Grid' }
)

const Grid: React.FunctionComponent<
  Props & React.HTMLProps<HTMLDivElement>
> = props => {
  const { container, item, className, children, ...divprops } = props
  const classes = useStyles(props)
  return (
    <div
      className={cx(
        {
          [classes.container]: container,
          [classes.item]: item,
          [classes.width]: true,
        },
        className
      )}
      {...divprops}
    >
      {children}
    </div>
  )
}

export { Grid }
