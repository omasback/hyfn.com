import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { Link } from 'gatsby'
import merge from 'lodash/merge'
import HubspotForm from 'react-hubspot-form'
import easings from 'easings-css'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import constants from 'styles/constants'
import HyfnLogo from 'components/svg/HyfnLogo'
import { responsiveLengths } from 'styles/mixins'
import footerLogo from 'images/hyfn_logo_footer.svg'

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
      extend: responsiveLengths('width', 140, 200),
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
      textDecoration: 'none',
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
    formGrid: {
      extend: responsiveLengths('height', 111, 81),
      '& .submitted-message': {
        lineHeight: 4.5,
        extend: responsiveLengths('fontSize', 14, 17),
      },
    },
    form: {
      extend: responsiveLengths('marginTop', 30, 0),
      borderBottom: '2px solid #fff',
      display: 'flex',
      alignItems: 'flex-end',
      position: 'relative',
      '& .hs-form-field': {
        flexGrow: 1,
        '& label': {
          display: 'block',
        },
      },
      '& .hs-form-required': {
        display: 'none',
      },
      '& input[type=email]': {
        extend: responsiveLengths([['fontSize', 17, 17], ['height', 50, 40]]),
        width: '100%',
        background: 'transparent',
        border: 'none',
        color: '#fff',
        outline: 'none',
      },
      '& .legal-consent-container': {
        display: 'none',
      },
    },
    button: {
      color: '#fff',
      whiteSpace: 'nowrap',
      textAlign: 'right',
      paddingRight: 0,
      fontWeight: 'bold',
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      extend: merge(
        responsiveLengths('height', 50, 40),
        responsiveLengths('fontSize', 16, 20),
        responsiveLengths('paddingLeft', 10, 10)
      ),
    },
    errors: {
      position: 'absolute',
      top: '100%',
      left: 0,
      listStyleType: 'none',
      padding: 0,
      margin: '2% 0',
    },
    legalLinks: {
      extend: merge(
        responsiveLengths('marginTop', 34, 13),
        responsiveLengths('fontSize', 14, 17)
      ),
      [constants.mq.desktop]: {
        display: 'flex',
        alignItems: 'flex-end',
      },
      '& > *': {
        color: '#fff',
        textDecoration: 'none',
        display: 'inline-block',
        marginRight: '1em',
        marginBottom: '1em',
        [constants.mq.desktop]: {
          marginRight: '3em',
          marginBottom: '0.7em',
        },
      },
    },
  },
  { name: 'Mui-Footer' }
)

const Footer: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Container>
        <Grid container>
          <Grid item mobile={5}>
            <Link to="/">
              <img src={footerLogo} alt="" className={classes.logo} />
            </Link>
          </Grid>
          <Grid item mobile={5} className={classes.shareIcons}>
            <a
              href="https://www.facebook.com/WeAreHYFN/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookSquare color="#fff" className={classes.shareIcon} />
            </a>
            <a
              href="https://www.instagram.com/wearehyfn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram color="#fff" className={classes.shareIcon} />
            </a>
          </Grid>
        </Grid>

        <Grid container className={classes.row2}>
          <Grid item mobile={10} desktop={5} className={classes.h2}>
            <h2>
              Our inbox
              <br />
              is always
              <br />
              <Link to="/contact" className={classes.underline}>
                open.
              </Link>
            </h2>
          </Grid>
          <Grid item mobile={10} desktop={3} className={classes.offices}>
            {[
              {
                name: 'Los Angeles',
                street: '12777 W Jefferson Blvd',
                suite: 'Bldg B-100',
                city: 'Los Angeles, CA 90066',
                phone: '310.971.9300',
              },
              {
                name: 'New York',
                street: '79 Madison Avenue',
                suite: '16th Floor',
                city: 'New York, NY 10016',
                phone: '212.741.6400',
              },
            ].map(office => (
              <div className={classes.office} key={office.name}>
                <div>
                  <b>{office.name}</b>
                </div>
                <div>{office.street}</div>
                <div>{office.suite}</div>
                <div>{office.city}</div>
                <a href={`tel:${office.phone}`}>{office.phone}</a>
              </div>
            ))}
          </Grid>
          <Grid item mobile={10} desktop={2} className={classes.links}>
            {[
              {
                text: 'Culture',
                url: '/culture',
              },
              {
                text: 'Solutions',
                url: '/solutions',
              },
              {
                text: 'Work',
                url: '/work',
              },
              // {
              //   text: 'Thoughts',
              //   url: 'thoughts',
              // },
              // {
              //   text: 'Careers',
              //   url: '/careers',
              // },
            ].map(link => (
              <Link className={classes.link} key={link.url} to={link.url}>
                {link.text}
              </Link>
            ))}
          </Grid>
        </Grid>

        <Grid container className={classes.row3}>
          <Grid item mobile={10} desktop={3} className={classes.formGrid}>
            <HubspotForm
              portalId="3312902"
              formId="dbf80f4b-4875-4686-8ae0-ad3a3260c9cc"
              loading={<div>Loading...</div>}
              css={''}
              cssRequired={''} // this is what actually removes the hubspot css
              cssClass={classes.form}
              submitButtonClass={classes.button}
              errorMessageClass={classes.errors}
              inlineMessage={'Thank you!'}
            />
          </Grid>
          <Grid item mobile={10} desktop={7} className={classes.legalLinks}>
            <span>©2019 HYFN</span>
            <a
              href="https://classic.hyfn.com/services-privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Services Privacy Policy
            </a>
            <a
              href="https://classic.hyfn.com/corporate-privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Corporate Privacy Policy
            </a>
            <a
              href="https://classic.hyfn.com/terms-of-use/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of Use
            </a>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Footer
