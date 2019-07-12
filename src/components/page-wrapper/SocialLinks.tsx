import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import iconFB from 'images/logo_fb.svg'
import iconIG from 'images/logo_ig.svg'
import iconTW from 'images/logo_tw.svg'
import iconLI from 'images/logo_li.svg'
import { responsiveLengths } from 'styles/mixins'

const useStyles = makeStyles(
  {
    socialIcon: {
      extend: responsiveLengths([
        ['width', 23, 28],
        ['height', 23, 28],
        ['marginLeft', 13, 22],
      ]),
    },
  },
  { name: 'Mui-SocialIcons' }
)

const Footer: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles({})

  return (
    <>
      {[
        {
          href: 'https://www.facebook.com/WeAreHYFN/',
          Icon: iconFB,
        },
        {
          href: 'https://www.instagram.com/wearehyfn/',
          Icon: iconIG,
        },
        {
          href: 'https://twitter.com/hyfn?lang=en',
          Icon: iconTW,
        },
        {
          href: 'https://www.linkedin.com/company/hyfn/',
          Icon: iconLI,
        },
      ].map(link => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={link.Icon} color="#fff" className={classes.shareIcon} />
        </a>
      ))}
    </>
  )
}

export default Footer
