import * as React from 'react'
import * as cx from 'classnames'
import easings from 'easings-css/easings.json'

import xBlack from 'images/svg/x-black.svg'
import { makeStyles } from '@material-ui/styles'

export interface Props {
  isOpen: boolean
  onClose: () => void
  side?: 'left' | 'right'
  drawerClassName?: string
  closeClassName?: string
  closeImgSrc?: string
}

const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9,
    backgroundColor: '#000',
    opacity: 0,
    transform: 'scale(0)',
    pointerEvents: 'none',
    transition: 'opacity, transform',
    transitionDuration: '0.5s, 0s',
    transitionDelay: '0s, 0.5s',
  },
  overlayVisible: {
    opacity: 0.2,
    pointerEvents: 'all',
    transform: 'scale(1)',
    transitionDelay: '0s, 0s',
  },
  drawer: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 10,
    height: '100vh',
    width: 484,
    maxWidth: '75vw',
    transform: 'translateX(-100%)',
    transition: 'transform 0.5s',
    transitionTimingFunction: easings.easeOutQuint,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflowY: 'auto',
    paddingBottom: '65px',
    '@media (min-width: 600px)': {
      paddingBottom: 0,
    },
  },
  drawerRight: {
    left: 'auto',
    right: 0,
    transform: 'translateX(100%)',
  },
  drawerOpen: {
    transform: 'none',
    boxShadow: '4px 0 5px rgba(0, 0, 0, 0.1)',
  },
  drawerClose: {
    position: 'absolute',
    top: '24px',
    right: '22px',
    zIndex: 1,
    width: '14px',
    height: '14px',
    cursor: 'pointer',
  },
})

const Drawer: React.FunctionComponent<Props> = ({
  isOpen,
  onClose,
  side,
  children,
  drawerClassName,
  closeClassName,
  closeImgSrc,
}) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <div
        className={cx(classes.overlay, {
          [classes.overlayVisible]: isOpen,
        })}
        onClick={onClose}
      />

      <div
        className={cx(classes.drawer, drawerClassName, {
          [classes.drawerRight]: side === 'right',
          [classes.drawerOpen]: isOpen,
        })}
      >
        <img
          className={cx(classes.drawerClose, closeClassName)}
          src={closeImgSrc || xBlack}
          onClick={onClose}
        />
        {children}
      </div>
    </React.Fragment>
  )
}

export default Drawer
