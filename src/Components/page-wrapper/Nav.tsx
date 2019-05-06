import * as React from 'react'
import { slide as Menu } from 'react-burger-menu'
import { useMedia } from 'use-media'
import { NavLink, Link } from 'react-router-dom'
import { FaFacebookSquare } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'

import Container from 'Components/Container'
import { createStylesHook } from 'helpers/createStylesHook'
import hamburger from 'images/hamburger.svg'
import theme from 'styles/theme'
import XIcon from 'Components/svg/XIcon'
import HyfnLogo from 'Components/svg/HyfnLogo'
import PlayLogo from 'Components/svg/PlayLogo'

const useStyles = createStylesHook(
  {
    root: {
      padding: 0,
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
    },
    burgerIcon: {
      display: 'block',
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    menuContainer: {
      top: 0,
      color: '#fff',
    },
    overlayClassName: {
      top: 0,
      left: 0,
    },
    menuClassName: {
      background: theme.colors.black,
      padding: 40,
    },
    crossButtonClassName: {
      maxWidth: 18,
      maxHeight: 18,
      transform: 'translate(-38px, 38px)',
    },
    xIcon: {},
    itemListClassName: {
      display: 'flex',
      flexDirection: 'column',
    },
    mobileMenuLogo: {
      width: 111,
      marginBottom: 70,
      outline: 'none',
    },
    mainLinks: {
      flexGrow: 1,
    },
    mobileMainLink: {
      display: 'block',
      fontSize: 21,
      lineHeight: '32px',
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
    },
    socialLink: {
      marginRight: 20,
    },
    socialIcon: {
      width: 25,
      height: 25,
      fill: '#fff',
    },
    desktopRow: {
      display: 'flex',
      paddingTop: 52,
    },
    desktopLogo: {
      width: '100px',
      display: 'block',
      height: '26px',
      marginRight: '52px',
    },
    desktopLeftLinks: {
      display: 'flex',
      flexGrow: 1,
    },
    desktopLeftLink: {
      display: 'flex',
      marginRight: 50,
      color: theme.colors.black,
      fontSize: 17,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      position: 'relative',
    },
    desktopMainLinkActive: {
      '&:after': {
        content: "''",
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 3,
        backgroundColor: theme.colors.black,
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
      color: theme.colors.black,
      fontSize: 17,
      textDecoration: 'none',
      marginLeft: 32,
      whiteSpace: 'nowrap',
    },
  },
  { name: 'Nav' }
)

const mainLinks = [
  {
    text: 'About',
    path: '/about',
  },
  {
    text: 'Services',
    path: '/services',
  },
  {
    text: 'Work',
    path: '/work',
  },
  {
    text: 'Thoughts',
    path: '/thoughts',
  },
  {
    text: 'Careers',
    path: '/careers',
  },
  {
    text: 'Play',
    path: '/play',
  },
  {
    text: 'Contact us',
    path: '/contact',
  },
]

const Nav: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()
  const isWide = useMedia({ minWidth: 820 })

  return (
    <div className={classes.root}>
      <Container>
        {isWide ? (
          <div className={classes.desktopRow}>
            <Link to="/">
              <HyfnLogo
                color={theme.colors.black}
                className={classes.desktopLogo}
              />
            </Link>
            <div className={classes.desktopLeftLinks}>
              {mainLinks.slice(0, 4).map(link => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={classes.desktopLeftLink}
                  activeClassName={classes.desktopMainLinkActive}
                >
                  {link.text}
                </NavLink>
              ))}
            </div>
            <div className={classes.desktopRightLinks}>
              <NavLink to={mainLinks[5].path}>
                <PlayLogo
                  color={theme.colors.black}
                  className={classes.playLogo}
                />
              </NavLink>
              <NavLink to={mainLinks[6].path} className={classes.contactLink}>
                {mainLinks[6].text}
              </NavLink>
            </div>
          </div>
        ) : (
          <>
            <Link to="/">
              <HyfnLogo
                color={theme.colors.black}
                className={classes.mobileLogo}
              />
            </Link>
            <Menu
              right
              pageWrapId={'page-wrap'}
              width="100%"
              customBurgerIcon={
                // need span wrapper because the lib overwrites the classname
                // https://github.com/negomi/react-burger-menu/issues/95
                <span>
                  <img
                    src={hamburger}
                    className={classes.burgerIcon}
                    alt="menu"
                  />
                </span>
              }
              customCrossIcon={
                <XIcon color="#ffffff" className={classes.xIcon} />
              }
              className={classes.menuContainer}
              burgerButtonClassName={classes.hamburger}
              menuClassName={classes.menuClassName}
              crossButtonClassName={classes.crossButtonClassName}
              itemListClassName={classes.itemListClassName}
              overlayClassName={classes.overlayClassName}
            >
              <HyfnLogo color="#ffffff" className={classes.mobileMenuLogo} />
              <div className={classes.mainLinks}>
                {mainLinks.map(link => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={classes.mobileMainLink}
                    activeClassName={classes.mobileMainLinkaActive}
                  >
                    {link.text}
                  </NavLink>
                ))}
              </div>
              <div className={classes.socialLinks}>
                {[
                  {
                    href: 'https://www.facebook.com/WeAreHYFN/',
                    icon: FaFacebookSquare,
                  },
                  {
                    href: 'https://www.instagram.com/wearehyfn',
                    icon: FaInstagram,
                  },
                ].map(link => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={classes.socialLink}
                  >
                    <link.icon className={classes.socialIcon} />
                  </a>
                ))}
              </div>
            </Menu>
          </>
        )}
      </Container>
    </div>
  )
}

Nav.displayName = 'Nav'

export default Nav
