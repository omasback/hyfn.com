import * as React from 'react'
import * as cx from 'classnames'
import HamburgerMenu from 'react-hamburger-menu'
import { Link } from 'gatsby'
import { useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import easings from 'easings-css/easings.json'

import { responsiveLengths, absoluteFill } from 'styles/mixins'
import Container from 'components/display/Container'
import constants from 'styles/constants'
import HyfnLogo from 'components/svg/HyfnLogo'
import { Theme } from 'layouts'
import SocialLinks from './SocialLinks'

const transitionDuration = 500

const useStyles = makeStyles<Theme>(
  theme => ({
    root: {
      padding: 0,
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: 2,
    },
    mobileLogo: {
      width: 111,
      display: 'block',
      marginTop: 40,
      marginLeft: 0,
    },
    hamburger: {
      width: 32,
      height: 12,
      position: 'absolute',
      top: 50,
      right: 40,
      zIndex: 2,
    },
    drawer: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10,
      height: '100vh',
      width: '100vw',
      transform: 'translateX(-100%)',
      transition: 'transform 0.5s',
      transitionDuration: transitionDuration + 'ms',
      transitionTimingFunction: easings.easeOutQuint,
      backgroundColor: constants.colors.darkGray,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      overflowY: 'hidden',
      paddingBottom: '65px',
      '@media (min-width: 600px)': {
        paddingBottom: 0,
      },
    },
    drawerOpen: {
      transform: 'none',
      boxShadow: '4px 0 5px rgba(0, 0, 0, 0.1)',
    },
    drawerInner: {
      extend: absoluteFill(),
      width: '100vw',
      paddingTop: 40,
      willChange: 'transform',
      transform: 'translateX(100%)',
      transition: 'transform',
      transitionDuration: transitionDuration + 'ms',
      transitionTimingFunction: easings.easeOutQuint,
      pointerEvents: 'none',
      overflowY: 'auto',
    },
    drawerInnerOpen: {
      transform: 'translateX(0)',
      pointerEvents: 'all',
    },
    itemListClassName: {
      display: 'flex',
      flexDirection: 'column',
    },
    mobileMenuLogo: {
      width: 111,
      marginBottom: 83,
      outline: 'none',
    },
    mobileMainLinks: {
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    mobileMainLink: {
      extend: responsiveLengths('fontSize', 34, 34),
      lineHeight: 1.6,
      display: 'block',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      outline: 'none',
      position: 'relative',
    },
    mobileMainLinkaActive: {
      '&:after': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        backgroundColor: '#fff',
      },
    },
    socialLinks: {
      display: 'flex',
      extend: responsiveLengths([
        ['marginTop', 55, 22],
        ['marginBottom', 55, 22],
      ]),
      '& > *': {
        display: 'inline-block',
        extend: responsiveLengths([
          ['width', 26, 0],
          ['height', 26, 0],
          ['marginRight', 36, 0],
        ]),
      },
    },
    socialIcon: {
      width: 25,
      height: 25,
      fill: '#fff',
    },
    desktopRow: {
      display: 'flex',
      alignItems: 'center',
      paddingTop: 52,
    },
    desktopLogo: {
      width: '100px',
      display: 'block',
      height: '38px',
      marginRight: '52px',
      position: 'relative',
      top: 4,
    },
    desktopLeftLinks: {
      display: 'flex',
      flexGrow: 1,
    },
    desktopLeftLink: {
      display: 'flex',
      marginRight: '4.5%',
      fontSize: 17,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      position: 'relative',
    },
    desktopMainLinkActive: {
      '&:after': {
        content: "''",
        position: 'absolute',
        bottom: -10,
        left: 0,
        width: '100%',
        height: 3,
        backgroundColor: theme.color,
        transition: `background-color ${constants.themeTransitionDuration}`,
      },
    },
    desktopRightLinks: {
      display: 'flex',
    },
    playLogo: {
      width: 30,
      height: 28,
    },
    contactLink: {
      fontSize: 17,
      textDecoration: 'none',
      marginLeft: 0,
      whiteSpace: 'nowrap',
    },
  }),
  { name: 'Nav' }
)

const mainLinks = [
  {
    text: 'Culture',
    path: '/culture/',
  },
  {
    text: 'Solutions',
    path: '/solutions/',
  },
  {
    text: 'Work',
    path: '/work/',
  },
  {
    text: 'Amplification',
    path: '/solutions/#Amplification',
  },
  {
    text: 'Creative',
    path: '/solutions/#Creative',
  },
  {
    text: 'Technology',
    path: '/solutions/#Technology',
  },
  // {
  //   text: 'Thoughts',
  //   path: '/thoughts',
  // },
  // {
  //   text: 'Careers',
  //   path: '/careers',
  // },
  // {
  //   text: 'Play',
  //   path: '/play',
  // },
  {
    text: 'Contact us',
    path: '/contact/',
  },
]

const Nav: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()
  const [isOpen, setOpen] = React.useState(false)
  const isWide = useMediaQuery(constants.mq.desktop.replace('@media ', ''))

  return (
    <div className={classes.root}>
      <Container>
        {isWide ? (
          <div className={classes.desktopRow}>
            <Link to="/">
              <HyfnLogo className={classes.desktopLogo} />
            </Link>
            <div className={classes.desktopLeftLinks}>
              {mainLinks.slice(0, 6).map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={classes.desktopLeftLink}
                  activeClassName={classes.desktopMainLinkActive}
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <div className={classes.desktopRightLinks}>
              {/* <Link to={'/play'}>
                <PlayLogo className={classes.playLogo} />
              </Link> */}
              <Link to={'/contact/'} className={classes.contactLink}>
                {'Contact Us'}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Link to="/">
              <HyfnLogo className={classes.mobileLogo} />
            </Link>
            <div className={classes.hamburger}>
              <HamburgerMenu
                isOpen={isOpen}
                menuClicked={() => setOpen(!isOpen)}
                width={32}
                height={12}
                strokeWidth={2}
                rotate={0}
                color={constants.colors.darkGray}
                borderRadius={0}
                animationDuration={0.5}
              />
            </div>
            <div
              className={cx(classes.drawer, {
                [classes.drawerOpen]: isOpen,
              })}
            >
              <Container
                className={cx(classes.drawerInner, {
                  [classes.drawerInnerOpen]: isOpen,
                })}
              >
                <div className={classes.hamburger}>
                  <HamburgerMenu
                    isOpen={isOpen}
                    menuClicked={() => setOpen(!isOpen)}
                    width={32}
                    height={12}
                    strokeWidth={2}
                    rotate={0}
                    color={constants.colors.lightGray}
                    borderRadius={0}
                    animationDuration={0.5}
                  />
                </div>
                <HyfnLogo color="#ffffff" className={classes.mobileMenuLogo} />
                <div className={classes.mobileMainLinks}>
                  {mainLinks.map(link => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={classes.mobileMainLink}
                      activeClassName={classes.mobileMainLinkaActive}
                      onClick={() => setOpen(false)}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
                <div className={classes.socialLinks}>
                  <SocialLinks />
                </div>
              </Container>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

Nav.displayName = 'Nav'

export default Nav
