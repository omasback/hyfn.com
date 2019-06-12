import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import merge from 'lodash/merge'
import HubspotForm from 'react-hubspot-form'
import { graphql } from 'gatsby'
import * as cx from 'classnames'

import Container from 'components/display/Container'
import ScrollReveal from 'components/display/ScrollReveal'
import OffsetHeadline from 'components/display/OffsetHeadline'
import { responsiveLengths, bleedRight } from 'styles/mixins'
import constants from 'styles/constants'
import Grid from 'components/display/Grid'
import ThemeSetter from 'components/display/ThemeSetter'

const useStyles = makeStyles(
  {
    root: {
      extend: responsiveLengths('paddingTop', 135, 150),
      overflow: 'hidden',
    },
    formDescription: {
      '& h2': {
        extend: responsiveLengths([
          ['marginBottom', 0, 90],
          ['marginBottom', 40, 50],
        ]),
      },
      '& p': {
        extend: responsiveLengths('marginBottom', 60),
      },
    },
    formSection: {
      position: 'relative',
    },
    form: {
      width: '100%',
    },
    formWrapper: {
      backgroundColor: constants.colors.lightGray,
      color: constants.colors.darkGray,
      extend: responsiveLengths([
        ['paddingTop', 40, 100],
        ['paddingBottom', 40, 100],
        ['marginTop', 0, 80],
      ]),
      paddingLeft: '10%',
      paddingRight: '10%',
      '& form': {
        // display: 'grid',
        // gridTemplateColumns: '50% 50%',
      },
      '& fieldset': {
        margin: 0,
        padding: 0,
        border: 'none',
      },
      [constants.mq.desktop]: {
        '& .form-columns-2': {
          '& > *': {
            width: '50%',
            float: 'left',
            '&:first-child': {
              paddingRight: '5%',
            },
          },
        },
      },
      '& label': {
        extend: responsiveLengths('fontSize', 14, 18),
      },
      '& input': {
        extend: responsiveLengths('fontSize', 16, 22),
        paddingLeft: 0,
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: '1px solid',
        borderBottomColor: '#bbb',
        width: '100%',
      },
      '& input[type="checkbox"]': {
        position: 'relative',
        top: 2,
        width: 'auto',
      },
      '& input[type="submit"]': {
        extend: responsiveLengths('marginTop', 20, 40),
        border: 'none',
        backgroundColor: constants.colors.yellow,
        fontWeight: 'bold',
        height: 55,
        color: '#fff',
      },
      '& select': {
        extend: responsiveLengths([
          ['fontSize', 16, 18],
          ['marginTop', 4],
          ['padding', 4],
        ]),
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: 0,
        border: 'none',
        appearance: 'none',
      },
      '& textarea': {
        extend: responsiveLengths([['fontSize', 16], ['marginTop', 4]]),
        backgroundColor: 'transparent',
        border: '1px solid #bbb',
        width: '100%',
      },
      '& .hs-form-field': {
        extend: responsiveLengths('marginBottom', 30, 40),
      },
      '& .hs-error-msgs': {
        extend: responsiveLengths('fontSize', 12),
        color: constants.colors.red,
        padding: 0,
      },
      '& ul.inputs-list.multi-container': {
        listStyle: 'none',
        padding: 0,
      },
      '& .legal-consent-container': {
        fontSize: 10,
      },
    },
    address: {
      extend: responsiveLengths([
        ['marginTop', 60, 270],
        ['marginBottom', 90, 0],
      ]),
      position: 'relative',
    },
    address0: {
      extend: responsiveLengths([
        ['paddingTop', 120, 0],
        ['paddingBottom', 0, 300],
      ]),
    },
    address1: {
      extend: responsiveLengths([['paddingBottom', 0, 300]]),
    },
    addressImg: {
      position: 'absolute',
    },
    addressImg0: {
      extend: responsiveLengths([
        ['top', 0, -53],
        ['left', 126, 627],
        ['width', 173, 513],
      ]),
    },
    addressImg1: {
      extend: responsiveLengths([
        ['top', 42, 0],
        ['left', 0, 0],
        ['width', 173, 510],
      ]),
    },
    addressHeadline: {},
    addressHeadline0: {
      marginLeft: '16%',
      extend: responsiveLengths([['marginLeft', 48, 160]]),
    },
    addressHeadline1: {
      extend: responsiveLengths([
        ['marginLeft', 39, 390],
        ['marginTop', 0, 190],
      ]),
    },
    addressDetails: {
      extend: responsiveLengths('fontSize', 14, 16),
      lineHeight: '1.7',
    },
    addressDetails0: {
      extend: responsiveLengths([
        ['marginLeft', 27, 0],
        ['marginTop', 27, -140],
      ]),
    },
    addressDetails1: {
      extend: responsiveLengths([
        ['marginLeft', 201, 970],
        ['marginRight', -60, 0],
        ['marginTop', 33, -130],
      ]),
    },
  },
  { name: 'Contact' }
)

const Contact: React.FunctionComponent<IContactProps> = props => {
  const classes = useStyles(props)

  const cms = props.data.contentfulContactPage

  return (
    <Container className={classes.root}>
      <Grid container className={classes.formSection}>
        <ThemeSetter
          color={'#fff'}
          backgroundColor={constants.colors.blue}
          parent="Contact"
        />
        <Grid item mobile={8} desktop={10} className={classes.formDescription}>
          <ScrollReveal>
            <h1>{cms.headline}</h1>
          </ScrollReveal>
        </Grid>

        <Grid item mobile={10} desktop={10}>
          <div className={classes.formWrapper}>
            <HubspotForm
              portalId="3312902"
              formId="212510d7-8e98-43a5-9c36-72267ef0ea95"
              loading={<div>Loading...</div>}
              css={''}
              cssRequired={''} // this is what actually removes the hubspot css
              cssClass={classes.form}
            />
          </div>
        </Grid>
      </Grid>
      {cms.officeAddresses.map((a, i) => (
        <Grid
          item
          mobile={10}
          desktop={10}
          key={a.officeName}
          className={cx(classes.address, classes['address' + i])}
        >
          <ThemeSetter
            color={a.textColor}
            backgroundColor={a.backgroundColor}
            parent={a.officeName}
          />
          <img
            src={a.image.file.url}
            alt=""
            className={cx(classes.addressImg, classes['addressImg' + i])}
          />
          <OffsetHeadline
            text={a.officeName}
            className={cx(
              classes.addressHeadline,
              classes['addressHeadline' + i]
            )}
          />
          <div
            className={cx(
              classes.addressDetails,
              classes['addressDetails' + i]
            )}
          >
            {a.addressLine1}
            <br />
            {a.addressLine2}
            <br />
            {a.cityStateZip}
            <br />
            <a href={`tel:${a.phoneNumber}`}>{a.phoneNumber}</a>
            <br />
          </div>
        </Grid>
      ))}
    </Container>
  )
}

export default Contact

interface IContactProps {
  data: {
    contentfulContactPage: {
      headline: string
      description: string
      officeAddresses: Array<{
        addressLine1: string
        addressLine2: string
        backgroundColor: string
        cityStateZip: string
        image: {
          file: {
            url: string
          }
        }
        phoneNumber: string
        textColor: string
        officeName: string
      }>
    }
  }
}

export const pageQuery = graphql`
  query ContactPage {
    contentfulContactPage(slug: { eq: "contact" }) {
      headline
      description
      officeAddresses {
        addressLine1
        addressLine2
        backgroundColor
        cityStateZip
        image {
          file {
            url
          }
        }
        phoneNumber
        textColor
        officeName
      }
    }
  }
`
