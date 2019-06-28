import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'
import useComponentSize from '@rehooks/component-size'

const useStyles = makeStyles({
  root: {
    opacity: 0,
  },
  decoded: {
    opacity: 1,
  },
})

interface IImgProps extends React.HTMLProps<HTMLImageElement> {
  className?: string
}

const Img: React.FunctionComponent<IImgProps> = props => {
  const { src = '', onLoad, crossOrigin, ...nativeAttrs } = props // crossOrigin typedef is buggy

  const classes = useStyles(props)

  const isGif = src.indexOf('.gif') > -1

  const [{ modifiedSrc, isFinalSize }, setModifiedSrc] = React.useState({
    modifiedSrc: src + '?w=10',
    isFinalSize: false,
  })

  const imgRef = React.useRef<HTMLImageElement>(null)

  const { width, height } = useComponentSize(imgRef)

  const [visibility, setVisibility] = React.useState(false)

  React.useLayoutEffect(() => {
    if (width === 0) return

    const img = imgRef.current
    if (img) {
      const pixelDensity = window.devicePixelRatio
      const requestWidth = Math.ceil((width * pixelDensity) / 100) * 100
      const newModifiedSrc = isGif ? src : src + '?w=' + requestWidth // contentful resized gifs are larger than originals
      if (img.decode) {
        const jsImg = new Image()
        jsImg.src = newModifiedSrc
        jsImg
          .decode()
          .then(() => {
            setModifiedSrc({ modifiedSrc: newModifiedSrc, isFinalSize: true })
          })
          .catch(error => {
            setModifiedSrc({ modifiedSrc: newModifiedSrc, isFinalSize: true })
            // throw new Error(error.message)
          })
      } else {
        setModifiedSrc({ modifiedSrc: newModifiedSrc, isFinalSize: true })
      }
    }
  }, [props.src, width])

  return (
    <img
      ref={imgRef}
      src={modifiedSrc}
      {...nativeAttrs}
      className={cx(classes.root, props.className, {
        [classes.decoded]: visibility,
      })}
      onLoad={evt => {
        if (isFinalSize) {
          if (onLoad) {
            onLoad(evt)
          }
          setVisibility(true)
        }
      }}
    />
  )
}

export default Img
