import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import { Link } from 'gatsby'
import easings from 'easings-css'
import { responsiveLengths } from 'styles/mixins'
import constants from 'styles/constants'

const useStyles = makeStyles(
  {
    card: {
      extend: responsiveLengths([['padding', 40, 60]]),
      height: '100%',
      color: '#FFFFFF',
      cursor: 'pointer',
    },
    content: {
      opacity: 1,
    },
    title: {
      extend: responsiveLengths([['fontSize', 14, 18], ['width', 150, 200]]),
      fontWeight: 'normal',
      margin: 0,
      transition: 'transform 0.5s',
      transitionTimingFunction: easings.easeOutQuint,
    },
    headline: {
      extend: responsiveLengths([
        ['fontSize', 21, 40],
        ['marginTop', 35, 54],
        ['marginBottom', 8, 33],
      ]),
      fontWeight: 600,
      lineHeight: 1.2,
    },
    copy: {
      extend: responsiveLengths('fontSize', 17, 25),
      lineHeight: 1.2,
      marginBottom: 0,
    },
    links: {
      extend: responsiveLengths([
        ['fontSize', 14, 18],
        ['marginTop', 15, 50],
        ['marginBottom', 20, 20],
      ]),
      fontWeight: 'bold',
      lineHeight: 1.8,
    },
    link: {
      display: 'block',
      color: '#FFFFFF',
      textDecoration: 'underline',
    },
  },
  { name: 'HomepageHeroCard' }
)

const HomepageHeroCard: React.FunctionComponent<IHomepageHeroCard> = props => {
  const classes = useStyles({})

  const { i, open, title, headline, copy, links, color } = props
  return (
    <div className={classes.card} style={{ backgroundColor: color }}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.content}>
        <h3
          className={classes.headline}
          dangerouslySetInnerHTML={{ __html: headline }}
        />
        <p
          className={classes.copy}
          dangerouslySetInnerHTML={{ __html: copy }}
        />
        <div className={classes.links}>
          {links.map((link, j) => (
            <Link key={j} to={link.url} className={classes.link}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomepageHeroCard

interface IHomepageHeroCard {
  i: number
  open: boolean
  title: string
  headline: string
  copy: string
  color: string
  links: Array<{
    url: string
    text: string
  }>
}
