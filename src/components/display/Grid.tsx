import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import theme from 'styles/theme'

interface Props {
  container?: boolean // if this is a parent of a grid item
  item?: boolean // if this is a child of a grid container (can be both container and child at the same time.)
  mobile?: number // number of columns (out of 10) it should span on mobile and up
  desktop?: number // number of columns (out of 10) it should span on desktop
  offsetMobile?: number // number of columns to offset left on mobile and up
  offsetDesktop?: number // number of columns to offset left on desktop
  alignItemsMobile?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
  alignItemsDesktop?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'stretch'
    | 'baseline'
  className?: string // for adding/overriding styles
}

const mobileGutter = 10
const desktopGutter = 20

const useStyles = makeStyles(
  {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: `calc(100% + ${mobileGutter}px)`,
      margin: -mobileGutter / 2,
      justifyContent: 'center',
      [theme.mq.desktop]: {
        justifyContent: 'space-between',
        width: `calc(100% + ${desktopGutter}px)`,
        margin: -desktopGutter / 2,
      },
      '& > $container': {
        margin: 0,
        padding: 0,
      },
    },
    item: {
      padding: mobileGutter / 2,
      [theme.mq.desktop]: {
        padding: desktopGutter / 2,
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
    offset: (props: Props) => ({
      marginLeft: props.offsetMobile ? props.offsetMobile * 10 + '%' : 0,
      [theme.mq.desktop]: {
        marginLeft: props.offsetDesktop
          ? props.offsetDesktop * 10 + '%'
          : props.offsetMobile
          ? props.offsetMobile * 10 + '%'
          : 0,
      },
    }),
    alignItems: (props: Props) => ({
      alignItems: props.alignItemsMobile,
      [theme.mq.desktop]: {
        alignItems: props.alignItemsDesktop
          ? props.alignItemsDesktop
          : props.alignItemsMobile
          ? props.alignItemsMobile
          : 'flex-start',
      },
    }),
  },
  { name: 'Grid' }
)

const Grid: React.FunctionComponent<
  Props & React.HTMLProps<HTMLDivElement>
> = props => {
  const {
    container,
    item,
    className,
    mobile,
    desktop,
    offsetMobile,
    offsetDesktop,
    alignItemsMobile,
    alignItemsDesktop,
    children,
    ...divprops
  } = props
  const classes = useStyles(props)
  return (
    <div
      className={cx(
        {
          [classes.container]: container,
          [classes.item]: item,
          [classes.width]: mobile || desktop,
          [classes.offset]: offsetMobile || offsetDesktop,
          [classes.alignItems]: alignItemsMobile || alignItemsDesktop,
        },
        className
      )}
      {...divprops}
    >
      {children}
    </div>
  )
}

export default Grid
