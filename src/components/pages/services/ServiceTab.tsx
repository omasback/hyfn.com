import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import Slider from 'react-slick'
import easings from 'easings-css'

import Container from 'components/display/Container'
import Grid from 'components/display/Grid'
import { responsiveLengths } from 'styles/mixins'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import constants from 'styles/constants'
import ArrowLink from 'components/display/ArrowLink'
import CircleArrow from 'components/display/CircleArrow'
import Img from 'components/display/Img'

const useStyles = makeStyles(
  {
    root: {
      color: '#fff',
      overflow: 'hidden',
      paddingBottom: '15%',
      [constants.mq.desktop]: {
        overflow: 'unset',
        position: 'relative',
        paddingBottom: 0,
      },
    },
    rootClosed: {
      cursor: 'pointer',
    },
    bgExtend: {
      position: 'absolute',
      top: 0,
      left: '100%',
      width: '100%',
      height: '100%',
    },
    container: {
      [constants.mq.desktop]: {
        padding: '2% 0 10% 10%',
        maxWidth: 'auto',
      },
    },
    initial: {
      extend: responsiveLengths([['fontSize', 250, 410]]),
      fontWeight: 'bold',
      lineHeight: 1,
      transition: 'transform 1s',
      transformOrigin: 'top left',
      transitionTimingFunction: easings.easeOutQuint,
    },
    initialClosed: {
      transform: 'translate(-8%, 4%) scale(0.09)',
    },
    title: {
      extend: responsiveLengths([['fontSize', 21, 37], ['marginTop', 46, 30]]),
      fontWeight: 'bold',
    },
    bulletPoints: {
      [constants.mq.desktop]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      '& > p': {
        display: 'none', // this is if the editor accidentally adds linebreak
      },
      '& ul': {
        extend: responsiveLengths([['fontSize', 14]]),
        listStyleType: 'none',
        paddingLeft: 0,
      },
      '& > ul': {
        extend: responsiveLengths([['marginTop', 30, 40]]),
        [constants.mq.desktop]: {
          width: '43%',
        },
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
    sliderContainer: {
      marginBottom: '10%',
      '& .slick-list': {
        overflow: 'visible',
      },
    },
    cs: {
      extend: responsiveLengths([
        ['paddingLeft', 14, 0],
        ['paddingRight', 14, 24],
      ]),
      outline: 'none',
    },
    csImage: {
      width: '100%',
      marginBottom: '1em',
    },
    csLink: {
      extend: responsiveLengths('fontSize', 14, 14),
    },
    arrow: {
      position: 'absolute',
      top: '45%',
      transform: 'translateY(-50%)',
      zIndex: 1,
    },
    leftArrow: {
      left: '-5%',
    },
    rightArrow: {
      right: '-5%',
    },
  },
  { name: 'ServiceTab' }
)

export default (props: IServiceTab) => {
  const classes = useStyles({})

  const { i, open, title, bulletPoints, caseStudies } = props

  return (
    <div
      id={title}
      className={cx(classes.root, {
        [classes.rootClosed]: !open,
      })}
      style={{
        backgroundColor: [
          constants.colors.yellow,
          constants.colors.blue,
          constants.colors.red,
        ][i],
      }}
    >
      <div
        className={classes.bgExtend}
        style={{
          backgroundColor: [
            constants.colors.yellow,
            constants.colors.blue,
            constants.colors.red,
          ][i],
        }}
      />
      <Container className={classes.container}>
        <div
          className={cx(classes.initial, {
            [classes.initialClosed]: !open,
          })}
        >
          {title.slice(0, 1)}
        </div>
        <Grid container>
          <Grid item mobile={8} desktop={10}>
            <h3 className={classes.title}>{title}</h3>
            <div className={classes.bulletPoints}>
              {documentToReactComponents(bulletPoints.json)}
            </div>
            <h3 className={classes.title}>Some works</h3>
          </Grid>
          <Grid
            item
            mobile={9}
            desktop={10}
            className={classes.sliderContainer}
          >
            <Slider {...slickSettings}>
              {caseStudies.map(cs => (
                <div className={classes.cs} key={cs.slug}>
                  <Img
                    className={classes.csImage}
                    src={cs.linkImage.file.url}
                    alt=""
                  />
                  <ArrowLink
                    to={`/work/${cs.slug}/`}
                    text={cs.linkTitle}
                    className={classes.csLink}
                    color="#fff"
                  />
                </div>
              ))}
            </Slider>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export interface IServiceTab {
  i: number
  open: boolean
  title: string
  bulletPoints: {
    json: any
  }
  caseStudies: Array<{
    slug: string
    linkImage: {
      file: {
        url: string
      }
    }
    linkTitle: string
  }>
}

const Arrow = ({ direction, className, style, onClick }) => {
  const classes = useStyles({})

  return (
    <div
      className={cx(classes.arrow, classes[`${direction}Arrow`], className)}
      style={style}
      onClick={onClick}
    >
      <CircleArrow
        direction={direction}
        disabled={className.indexOf('disabled') > -1}
      />
    </div>
  )
}

const slickSettings = {
  responsive: [
    {
      breakpoint: 10000,
      settings: {
        dots: false,
        infinite: false,
        arrows: false,
        slidesToShow: 3,
      },
    },
    {
      breakpoint: constants.breakPoint.desktop - 1, // -1 because this is maxWidth
      settings: {
        dots: false,
        infinite: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <Arrow direction="left" />,
        nextArrow: <Arrow direction="right" />,
      },
    },
  ],
}
