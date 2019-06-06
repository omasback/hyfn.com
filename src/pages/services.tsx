import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { graphql } from 'gatsby'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import ColorTrails from 'components/display/ColorTrails'
import ScrollReveal from 'components/display/ScrollReveal'
import { bleedRight, largeParagraph, responsiveLengths } from 'styles/mixins'
import OffsetHeadline from 'components/display/OffsetHeadline'
import ImageAndText, {
  ImageAndTextProps,
} from 'components/display/ImageAndText'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import constants from 'styles/constants'
import ArrowLink from 'components/display/ArrowLink'

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
    tabs: {},
    serviceTab: {
      color: '#fff',
    },
    initial: {},
    title: {},
  },
  { name: 'Services' }
)

const Services: React.FunctionComponent<IServices> = props => {
  const classes = useStyles(props)

  const cms = props.data.contentfulServicesPage

  const [currentTab, setCurrentTab] = React.useState(undefined)

  return (
    <>
      <Container className={classes.root}>
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
      <div className={classes.tabs}>
        {cms.services.map((service, i) => (
          <div
            key={i}
            className={classes.serviceTab}
            style={{
              backgroundColor: [
                constants.colors.yellow,
                constants.colors.blue,
                constants.colors.red,
              ][i],
            }}
          >
            <div className={classes.initial}>{service.title.slice(0, 1)}</div>
            <h3 className={classes.title}>{service.title}</h3>
            {service.textBlocks.map(block =>
              documentToReactComponents(block.richText.json)
            )}
            {service.caseStudies.map(cs => (
              <div className="caseStudy" key={cs.slug}>
                <img src={cs.linkImage.file.url} alt="" />
                <ArrowLink to={`/work/${cs.slug}`} text={cs.linkTitle} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

export default Services

interface IServices {
  data: {
    contentfulServicesPage: {
      slug: string
      title: string
      secondTitle: string
      serviceSummaries: {
        richText: {
          json: any
        }
      }[]
      imageAndTextModules: ImageAndTextProps[]
      services: {
        title: string
        textBlocks: {
          richText: {
            json: any
          }
        }[]
        caseStudies: {
          slug: string
          linkImage: {
            file: {
              url: string
            }
          }
          linkTitle: string
        }[]
      }[]
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
        textBlocks {
          richText {
            json
          }
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
