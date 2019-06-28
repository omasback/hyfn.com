import * as React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as cx from 'classnames'

const useStyles = makeStyles({
  root: {
    visibility: 'hidden',
  },
  decoded: {
    visibility: 'visible',
  },
})

interface IImgProps extends React.HTMLProps<HTMLImageElement> {
  className?: string
}

const Img: React.FunctionComponent<IImgProps> = props => {
  const { crossOrigin, ...nativeAttrs } = props // crossOrigin typedef is buggy

  const classes = useStyles(props)

  const imgRef = React.useRef<HTMLImageElement>(null)

  const [visibility, setVisibility] = React.useState(false)

  React.useLayoutEffect(() => {
    const img = imgRef.current
    if (img) {
      if (img.decode) {
        img
          .decode()
          .then(() => {
            setVisibility(true)
          })
          .catch(error => {
            setVisibility(true)
            // throw new Error(error.message)
          })
      } else {
        setVisibility(true)
      }
    }
  }, [props.src])

  return (
    <img
      ref={imgRef}
      {...nativeAttrs}
      className={cx(classes.root, props.className, {
        [classes.decoded]: visibility,
      })}
    />
  )
}

export default Img
