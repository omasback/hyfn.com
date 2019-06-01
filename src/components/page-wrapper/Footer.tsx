import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { Link } from 'gatsby'
import merge from 'lodash/merge'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import constants from 'styles/constants'
import HyfnLogo from 'components/svg/HyfnLogo'
import { responsiveLengths } from 'styles/mixins'
import ThemeSetter from 'components/display/ThemeSetter'

const useStyles = makeStyles(
  {
    root: {
      padding: 0,
      backgroundColor: constants.colors.black,
      color: '#fff',
      position: 'relative',
      zIndex: 3,
      extend: merge(
        responsiveLengths('paddingTop', 50, 100),
        responsiveLengths('paddingBottom', 50, 42)
      ),
    },
    logo: {
      extend: responsiveLengths('width', 77, 100),
    },
    shareIcons: {
      textAlign: 'right',
    },
    shareIcon: {
      extend: merge(
        responsiveLengths('width', 23, 28),
        responsiveLengths('height', 23, 28),
        responsiveLengths('marginLeft', 13, 22)
      ),
    },
    row2: {
      extend: merge(
        responsiveLengths('marginTop', 35, 105),
        responsiveLengths('marginBottom', 0, 0)
      ),
      [constants.mq.desktop]: {
        justifyContent: 'flex-start',
      },
    },
    h2: {
      extend: merge(responsiveLengths('marginBottom', 55, 55)),
    },
    underline: {
      borderBottom: '3px solid #fff',
      [constants.mq.desktop]: {
        borderBottomWidth: 4,
      },
    },
    offices: {
      extend: merge(
        responsiveLengths('fontSize', 0, 18),
        responsiveLengths('marginTop', 0, 12)
      ),
      display: 'none',
      [constants.mq.desktop]: {
        display: 'block',
      },
    },
    office: {
      lineHeight: 1.7,
      extend: merge(responsiveLengths('marginBottom', 0, 54)),
    },
    links: {
      extend: merge(responsiveLengths('marginTop', 0, 21)),
    },
    link: {
      extend: merge(
        responsiveLengths('fontSize', 17, 17),
        responsiveLengths('marginBottom', 19, 21)
      ),
      display: 'block',
      color: '#fff',
      textDecoration: 'none',
    },
    row3: {
      flexDirection: 'row-reverse',
      extend: merge(responsiveLengths('paddingTop', 0, 50)),
    },
    form: {
      extend: merge(responsiveLengths('marginTop', 3, 0)),
      borderBottom: '2px solid #fff',
      display: 'flex',
    },
    input: {
      extend: merge(
        responsiveLengths('fontSize', 17, 17),
        responsiveLengths('height', 50, 40)
      ),
      width: '100%',
      background: 'transparent',
      border: 'none',
      color: '#fff',
      outline: 'none',
    },
    button: {
      color: '#fff',
      whiteSpace: 'nowrap',
      textAlign: 'right',
      paddingRight: '0',
      fontWeight: 'bold',
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      extend: merge(
        responsiveLengths('fontSize', 16, 20),
        responsiveLengths('paddingLeft', 10, 10),
        responsiveLengths('marginRight', -5, -5)
      ),
    },
    legalLinks: {
      extend: merge(
        responsiveLengths('marginTop', 34, 13),
        responsiveLengths('fontSize', 14, 17)
      ),
      '& > *': {
        color: '#fff',
        textDecoration: 'none',
        display: 'inline-block',
        marginRight: '1em',
        marginBottom: '1em',
        [constants.mq.desktop]: { marginRight: '3em' },
      },
    },
  },
  { name: 'Footer' }
)

const Footer: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ThemeSetter />
      <Container>
        <Grid container>
          <Grid item mobile={5}>
            <Link to="/">
              <HyfnLogo color={'#ffffff'} className={classes.logo} />
            </Link>
          </Grid>
          <Grid item mobile={5} className={classes.shareIcons}>
            <FaFacebookSquare color="#fff" className={classes.shareIcon} />
            <FaInstagram color="#fff" className={classes.shareIcon} />
          </Grid>
        </Grid>

        <Grid container className={classes.row2}>
          <Grid item mobile={10} desktop={5} className={classes.h2}>
            <h2>
              Our inbox
              <br />
              is always
              <br />
              <span className={classes.underline}>open.</span>
            </h2>
          </Grid>
          <Grid item mobile={10} desktop={3} className={classes.offices}>
            {[
              {
                name: 'Los Angeles',
                street: '12777 W Jefferson Blvd',
                suite: 'Bldg B-100',
                city: 'Los Angeles, CA 90066',
              },
              {
                name: 'New York',
                street: '79 Madison Avenue',
                suite: '16th Floor',
                city: 'New York, NY 10016',
              },
            ].map(office => (
              <div className={classes.office} key={office.name}>
                <div>
                  <b>{office.name}</b>
                </div>
                <div>{office.street}</div>
                <div>{office.suite}</div>
                <div>{office.city}</div>
              </div>
            ))}
          </Grid>
          <Grid item mobile={10} desktop={2} className={classes.links}>
            {[
              {
                text: 'About',
                url: '/about',
              },
              {
                text: 'Services',
                url: '/services',
              },
              {
                text: 'Work',
                url: '/work',
              },
              {
                text: 'Thoughts',
                url: 'thoughts',
              },
              {
                text: 'Careers',
                url: '/careers',
              },
            ].map(link => (
              <Link className={classes.link} key={link.url} to={link.url}>
                {link.text}
              </Link>
            ))}
          </Grid>
        </Grid>

        <Grid container className={classes.row3}>
          <Grid item mobile={10} desktop={3}>
            <form
              action="https://hyfn-api.herokuapp.com/contacts"
              method="post"
              className={classes.form}
            >
              <input
                name="email"
                type="email"
                placeholder="Sign Up For Our Newsletter"
                tabIndex={1}
                className={classes.input}
              />
              <button type="submit" className={classes.button} tabIndex={1}>
                ->
              </button>
            </form>
          </Grid>
          <Grid item mobile={10} desktop={7} className={classes.legalLinks}>
            <span>©2018 HYFN</span>
            <Link to="/services-privacy-policy/">Services Privacy Policy</Link>
            <Link to="/corporate-privacy-policy/">
              Corporate Privacy Policy
            </Link>
            <Link to="/terms-of-use/">Terms of Use</Link>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Footer
