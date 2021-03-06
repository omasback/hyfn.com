import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql, Link } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import easings from 'easings-css'
import { Portal, useMediaQuery } from '@material-ui/core'
import { Helmet } from 'react-helmet'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ScrollReveal from 'components/display/ScrollReveal'
import { largeParagraph, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import ImageAndText, {
  ImageAndTextProps,
} from 'components/display/ImageAndText'
import ServiceTab, { IServiceTab } from 'components/pages/services/ServiceTab'
import constants from 'styles/constants'
import XIcon from 'components/svg/XIcon'
import ThemeSetter from 'components/display/ThemeSetter'

const useStyles = makeStyles(
  {
    '@global html': {
      scrollBehavior: 'smooth',
    },
    root: {
      extend: responsiveLengths('marginBottom', 116, -280),
    },
    intro: {
      extend: merge(responsiveLengths('marginBottom', 30, 0), largeParagraph()),
      marginBottom: 0,
      '& a': {
        fontWeight: 'bold',
      },
    },
    headline: {
      extend: merge(responsiveLengths('marginTop', 0, 40)),
    },
    serviceSummaries: {
      extend: responsiveLengths('marginTop', 60, 120),
      '& p:first-child': {
        marginBottom: 0,
      },
    },
    xIcon: {
      position: 'absolute',
      extend: responsiveLengths([
        ['top', 50],
        ['right', 40],
        ['height', 20],
        ['width', 20],
      ]),
    },
    mobileTabs: {
      pointerEvents: 'none',
    },
    mobileTab: {
      pointerEvents: 'all',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '100vh',
      zIndex: 2,
      transition: 'transform 1s',
      transitionTimingFunction: easings.easeOutQuint,
      overflowY: 'hidden',
      overflowX: 'hidden',
    },
    mobileTab0: {
      transform: 'translate(0, 83%)',
    },
    mobileTab1: {
      transform: 'translate(15%, 77%)',
    },
    mobileTab2: {
      transform: 'translate(30%, 79%)',
    },
    mobileTabOpen: {
      transform: 'translate(0, 0)',
      overflowY: 'auto',
    },
    mobileTabHidden: {
      '&$mobileTab0': {
        transform: 'translate(0%, 93%)',
      },
      '&$mobileTab1': {
        transform: 'translate(20%, 105%)',
      },
      '&$mobileTab2': {
        transform: 'translate(40%, 110%)',
      },
    },
    desktopTabs: {
      extend: responsiveLengths([
        ['marginTop', 0, 200],
        // ['marginLeft', 0, -50],
      ]),
      display: 'none',
      [constants.mq.desktop]: {
        display: 'flex',
      },
    },
    desktopTab: {
      extend: responsiveLengths('minWidth', 0, 1000),
      transition: 'transform 1s',
      transitionTimingFunction: easings.easeOutQuint,
      '&:nth-child(1)': {
        extend: responsiveLengths([
          ['marginTop', 0, 40],
          ['marginLeft', 0, -50],
        ]),
      },
      '&:nth-child(2)': {
        extend: responsiveLengths([
          ['marginTop', 0, 0],
          ['marginLeft', 0, 100],
        ]),
        transform: 'translateX(0%)',
      },
      '&:nth-child(3)': {
        extend: responsiveLengths([
          ['marginTop', 0, 90],
          ['marginLeft', 0, 100],
        ]),
        transform: 'translateX(-100%)',
      },
    },
    desktopTabOpen: {
      '&:nth-child(2)': {
        transform: 'translateX(-100%)',
      },
      '&:nth-child(3)': {
        transform: 'translateX(-200%)',
      },
    },
  },
  { name: 'Mui-Solutions' }
)

const Solutions: React.FunctionComponent<ISolutions> = props => {
  const classes = useStyles(props)

  const cms = props.data.contentfulServicesPage
  const serviceTitles = cms.services.map(s => s.title)

  const isWide = useMediaQuery(constants.mq.desktop)

  const [currentTab, setCurrentTab] = React.useState(0)

  React.useEffect(() => {
    const hash = props.location.hash.slice(1)
    const index = serviceTitles.indexOf(hash)
    if (index >= 0) {
      setCurrentTab(index)
    } else {
      // TODO: find a better way to do this without using window
      if (
        typeof window !== 'undefined' &&
        window.matchMedia(constants.mq.desktop.replace('@media ', '')).matches
      ) {
        setCurrentTab(0)
      } else {
        setCurrentTab(-1)
      }
    }
  }, [props.location.hash])

  React.useEffect(() => {
    if (window) {
      window.document.body.style.overflow =
        isWide || currentTab === -1 ? null : 'hidden'
    }
    return () => {
      if (window) {
        window.document.body.style.overflow = null
      }
    }
  })

  return (
    <div className={classes.root}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Solutions | HYFN</title>
        <link rel="canonical" href="https://hyfn.com/solutions/" />
        <meta name="description" content={cms.metaDescription} />
      </Helmet>
      <ThemeSetter
        color={constants.colors.darkGray}
        backgroundColor={constants.colors.lightGray}
        parent={'Solutions'}
      />
      <Container>
        <Grid container>
          <Grid item mobile={8} desktop={4}>
            <ScrollReveal>
              <p className={classes.intro}>
                We help clients win through the use of{' '}
                <Link to="/solutions/#Amplification">Amplification</Link>,{' '}
                <Link to="/solutions/#Creative">Creative</Link>, and{' '}
                <Link to="/solutions/#Technology">Technology</Link>.
              </p>
            </ScrollReveal>
          </Grid>
          <Grid item className={classes.headline} mobile={10}>
            <OffsetHeadline text={cms.title} />
          </Grid>
        </Grid>
      </Container>
      {cms.imageAndTextModules.map(moduleProps => (
        <ImageAndText
          {...moduleProps}
          key={moduleProps.id}
          colorTrails={true}
        />
      ))}
      <Container>
        <OffsetHeadline text={cms.secondTitle} />
        <Grid container className={classes.serviceSummaries}>
          {cms.serviceSummaries.map((summary, i) => (
            <Grid
              key={i}
              item
              mobile={8}
              desktop={4}
              offsetDesktop={i % 2 ? 0.5 : 1}
            >
              {documentToReactComponents(summary.richText.json)}
            </Grid>
          ))}
        </Grid>
      </Container>
      {isWide ? (
        <Container className={classes.desktopTabs}>
          {cms.services.map((service, i) => (
            <div
              key={i}
              className={cx(classes.desktopTab, {
                [classes.desktopTabOpen]: currentTab >= i,
              })}
              onClick={() => setCurrentTab(i)}
            >
              <ServiceTab i={i} open={currentTab === i} {...service} />
            </div>
          ))}
        </Container>
      ) : (
        <Portal>
          <>
            {cms.services.map((service, i) => (
              <div
                key={i}
                className={cx(classes.mobileTab, classes[`mobileTab${i}`], {
                  [classes.mobileTabOpen]: currentTab === i,
                  [classes.mobileTabHidden]: currentTab > -1 && currentTab < i,
                })}
                onClick={() => setCurrentTab(i)}
              >
                <XIcon
                  color="#ffffff"
                  className={classes.xIcon}
                  onClick={evt => {
                    evt.stopPropagation()
                    setCurrentTab(-1)
                  }}
                />
                <ServiceTab i={i} open={currentTab === i} {...service} />
              </div>
            ))}
          </>
        </Portal>
      )}
    </div>
  )
}

export default Solutions

interface ISolutions {
  navigate: () => void
  location: Location
  data: {
    contentfulServicesPage: {
      slug: string
      title: string
      secondTitle: string
      metaDescription: string
      serviceSummaries: Array<{
        richText: {
          json: any
        }
      }>
      imageAndTextModules: ImageAndTextProps[]
      services: IServiceTab[]
    }
  }
}

export const pageQuery = graphql`
  query ServicesPageQuery {
    contentfulServicesPage {
      slug
      title
      secondTitle
      metaDescription
      serviceSummaries {
        richText {
          json
        }
      }
      imageAndTextModules {
        ...ImageAndTextFragment
      }
      services {
        title
        bulletPoints {
          json
        }
        caseStudies {
          slug
          linkImage {
            file {
              url
            }
          }
          linkTitle
        }
      }
    }
  }
`
