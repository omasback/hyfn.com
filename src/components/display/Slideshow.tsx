import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import merge from 'lodash/merge'
import { responsiveLengths, objectFitContain } from 'styles/mixins'
import Img from './Img'

const useStyles = makeStyles(
  {
    '@keyframes SlideShowFadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    root: {
      overflow: 'hidden',
      position: 'relative',
    },
    slide: {
      extend: objectFitContain(),
      zIndex: 0,
    },
    currentSlide: {
      zIndex: 1,
      animationName: '$SlideShowFadeIn',
      animationDuration: '1s',
      animationFillMode: 'both',
    },
  },
  { name: 'Slideshow' }
)

interface IProps {
  slides: Array<{ file: { url: string } }>
  aspectRatio: number
}

const Slideshow: React.FunctionComponent<IProps> = ({
  slides,
  aspectRatio,
}) => {
  const classes = useStyles({})
  const [index, setIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (slides.length > 1) {
        setIndex(prevIndex => (prevIndex + 1) % slides.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={classes.root}>
      <div style={{ paddingTop: (1 / aspectRatio) * 100 + '%' }}>
        {slides.map((slide, i) => (
          <Img
            key={i}
            src={slide.file.url}
            className={cx(classes.slide, {
              [classes.currentSlide]: index === i,
            })}
          />
        ))}
      </div>
    </div>
  )
}

export default Slideshow
