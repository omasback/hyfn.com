import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Slider from 'react-slick'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import easings from 'easings-css'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import { bleedRight, largeParagraph, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import ImageAndText, {
  ImageAndTextProps,
} from 'components/display/ImageAndText'
import ServiceTab, { IServiceTab } from 'components/pages/services/ServiceTab'
import constants from 'styles/constants'
import ArrowLink from 'components/display/ArrowLink'
import XIcon from 'components/svg/XIcon'
import CircleArrow from 'components/display/CircleArrow'
import useMedia from 'use-media'

const useStyles = makeStyles(
  {
    root: {
      extend: merge(
        responsiveLengths('marginTop', 71, 140),
        responsiveLengths('marginBottom', 116, 150)
      ),
    },
    intro: {
      extend: merge(
        responsiveLengths('marginTop', 63, 108),
        responsiveLengths('marginBottom', 50, 0),
        largeParagraph()
      ),
      marginBottom: 0,
      '& a': {
        fontWeight: 'bold',
      },
    },
    headline: {
      extend: merge(
        responsiveLengths('marginTop', 0, 40),
        responsiveLengths('marginBottom', 50, 0)
      ),
    },
    serviceSummaries: {
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
    initial: {
      extend: responsiveLengths([['fontSize', 250]]),
      fontWeight: 'bold',
      lineHeight: 1,
    },
    title: {
      extend: responsiveLengths([['fontSize', 21], ['marginTop', 46]]),
      fontWeight: 'bold',
    },
    bulletPoints: {
      '& ul': {
        extend: responsiveLengths([['fontSize', 14]]),
        listStyleType: 'none',
        paddingLeft: 0,
      },
      '& > ul': {
        extend: responsiveLengths([['marginTop', 30]]),
      },
      '& p': {
        marginBottom: 0,
      },
      '& > ul > li > p': {
        fontWeight: 'bold',
      },
    },
    drawer: {
      width: '100%',
    },
    desktopTabs: {
      extend: responsiveLengths([
        ['marginTop', 0, 200],
        ['marginLeft', 0, -50],
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
        marginTop: 40,
      },
      '&:nth-child(2)': {
        transform: 'translateX(0%)',
        marginLeft: 100,
      },
      '&:nth-child(3)': {
        marginTop: 90,
        marginLeft: 90,
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
  { name: 'Services' }
)

const Services: React.FunctionComponent<IServices> = props => {
  const classes = useStyles(props)

  const cms = props.data.contentfulServicesPage

  const [currentTab, setCurrentTab] = React.useState(-1)
  const isWide = useMedia({ minWidth: constants.breakPoint.desktop }, true)

  return (
    <div className={classes.root}>
      <Container>
        <Grid container>
          <Grid item mobile={8} desktop={4}>
            <ScrollReveal>
              <p className={classes.intro}>
                We help clients win through the use of{' '}
                <a href="#amplification" onClick={() => setCurrentTab(0)}>
                  Amplification
                </a>
                ,{' '}
                <a href="#creative" onClick={() => setCurrentTab(1)}>
                  Creative
                </a>
                , and{' '}
                <a href="#technology" onClick={() => setCurrentTab(2)}>
                  Technology
                </a>
                .
              </p>
            </ScrollReveal>
          </Grid>
          <Grid item className={classes.headline} mobile={10}>
            <OffsetHeadline text={cms.title} />
          </Grid>
        </Grid>
      </Container>
      {cms.imageAndTextModules.map(moduleProps => (
        <ImageAndText {...moduleProps} key={moduleProps.id} />
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
        <>
          {cms.services.map((service, i) => (
            <SwipeableDrawer
              key={i}
              anchor="right"
              open={currentTab === i}
              onClose={() => setCurrentTab(-1)}
              onOpen={() => null}
              disableSwipeToOpen={true}
              classes={{
                paper: classes.drawer,
              }}
            >
              <XIcon
                color="#ffffff"
                className={classes.xIcon}
                onClick={() => setCurrentTab(-1)}
              />
              <ServiceTab i={i} open={currentTab === i} {...service} />
            </SwipeableDrawer>
          ))}
        </>
      )}
    </div>
  )
}

export default Services

interface IServices {
  data: {
    contentfulServicesPage: {
      slug: string
      title: string
      secondTitle: string
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
      serviceSummaries {
        richText {
          json
        }
      }
      imageAndTextModules {
        image {
          file {
            url
          }
        }
        imageSide
        text {
          json
        }
        id
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
