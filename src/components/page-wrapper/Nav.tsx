import * as React from 'react'
import * as cx from 'classnames'
import HamburgerMenu from 'react-hamburger-menu'
import { Link } from 'gatsby'
import { makeStyles } from '@material-ui/styles'
import easings from 'easings-css/easings.json'
import { useLockBodyScroll } from 'react-use'

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
    mobileNav: {
      display: 'block',
      [constants.mq.desktop]: {
        display: 'none',
      },
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
    drawerRed: {
      backgroundColor: constants.colors.red,
      transitionDelay: '0ms',
    },
    drawerYellow: {
      backgroundColor: constants.colors.yellow,
      transitionDelay: '100ms',
    },
    drawerBlue: {
      backgroundColor: constants.colors.blue,
      transitionDelay: '150ms',
    },
    drawerBlack: {
      backgroundColor: constants.colors.darkGray,
      transitionDelay: '200ms',
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
      transitionDelay: '200ms',
      pointerEvents: 'none',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
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
    mobileMainLinkContainer: {
      overflow: 'hidden',
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
      transform: 'translateY(100%)',
      transition: 'transform',
      transitionDuration: transitionDuration * 3 + 'ms',
      transitionDelay: transitionDuration * 0.5 + 'ms',
      transitionTimingFunction: easings.easeOutQuint,
    },
    mobileMainLinkOpen: {
      transform: 'translateY(0)',
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
      marginBottom: 60,
      transform: 'translateY(150px)',
      transition: 'transform',
      transitionDuration: transitionDuration * 3 + 'ms',
      transitionDelay: transitionDuration * 0.5 + 'ms',
      transitionTimingFunction: easings.easeOutQuint,
      '& > *': {
        display: 'inline-block',
        extend: responsiveLengths([
          ['width', 26, 0],
          ['height', 26, 0],
          ['marginRight', 36, 0],
        ]),
      },
    },
    socialLinksOpen: {
      transform: 'translateY(0px)',
    },
    socialIcon: {
      width: 25,
      height: 25,
      fill: '#fff',
    },
    desktopNav: {
      display: 'none',
      alignItems: 'center',
      paddingTop: 52,
      [constants.mq.desktop]: {
        display: 'flex',
      },
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
  { name: 'Mui-Nav' }
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
  // {
  //   text: 'Amplification',
  //   path: '/solutions/#Amplification',
  // },
  // {
  //   text: 'Creative',
  //   path: '/solutions/#Creative',
  // },
  // {
  //   text: 'Technology',
  //   path: '/solutions/#Technology',
  // },
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

  useLockBodyScroll(isOpen)

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.desktopNav}>
          <Link to="/">
            <HyfnLogo className={classes.desktopLogo} />
          </Link>
          <div className={classes.desktopLeftLinks}>
            {mainLinks.slice(0, 3).map(link => (
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
        <div className={classes.mobileNav}>
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
          {[classes.drawerRed, classes.drawerYellow, classes.drawerBlue].map(
            colorClass => (
              <div
                key={colorClass}
                className={cx(classes.drawer, colorClass, {
                  [classes.drawerOpen]: isOpen,
                })}
              />
            )
          )}
          <div
            className={cx(classes.drawer, classes.drawerBlack, {
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
              <Link to="/" onClick={() => setOpen(false)}>
                <HyfnLogo color="#ffffff" className={classes.mobileMenuLogo} />
              </Link>
              <div className={classes.mobileMainLinks}>
                {mainLinks.map(link => (
                  <div
                    key={link.path}
                    className={classes.mobileMainLinkContainer}
                  >
                    <Link
                      to={link.path}
                      className={cx(classes.mobileMainLink, {
                        [classes.mobileMainLinkOpen]: isOpen,
                      })}
                      activeClassName={classes.mobileMainLinkaActive}
                      onClick={() => setOpen(false)}
                    >
                      {link.text}
                    </Link>
                  </div>
                ))}
              </div>
              <div
                className={cx(classes.socialLinks, {
                  [classes.socialLinksOpen]: isOpen,
                })}
              >
                <SocialLinks />
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </div>
  )
}

Nav.displayName = 'Nav'

export default Nav
