import * as React from 'react'
import classNames from 'classnames'
import { withStyles, createStyles, ThemeProvider } from '@material-ui/styles'
import { Link } from 'gatsby'
import easings from 'easings-css'
import { responsiveLengths } from 'styles/mixins'
import constants from 'styles/constants'

const Matter = require('matter-js')

function easeOutQuint(t) {
  return 1 + --t * t * t * t * t
}

const styles = createStyles({
  card: {
    extend: responsiveLengths([
      ['padding', 40, 60],
      ['paddingBottom', 140, 140],
      ['marginBottom', 20, 20],
    ]),
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    color: '#FFFFFF',
    cursor: 'pointer',
    backgroundColor: props => props.color,
  },
  content: {
    opacity: 0,
    transition: 'opacity 500ms',
  },
  content_visible: {
    opacity: 1,
  },
  title: {
    extend: responsiveLengths([['fontSize', 14, 18], ['width', 150, 200]]),
    fontWeight: 'normal',
    margin: 0,
    transition: 'transform 0.5s',
    transitionTimingFunction: easings.easeOutQuint,
  },
  titleClosed: {
    transform: 'translate(-15%, -225%)',
    [constants.mq.desktop]: {
      transform: 'translate(0%, -90%)',
    },
  },
  headline: {
    extend: responsiveLengths([
      ['fontSize', 21, 40],
      ['marginTop', 35, 54],
      ['marginBottom', 8, 33],
    ]),
    fontWeight: '600',
    lineHeight: 1.2,
  },
  copy: {
    extend: responsiveLengths('fontSize', 17, 25),
    lineHeight: 1.2,
    marginBottom: 0,
  },
  links: {
    extend: responsiveLengths([
      ['fontSize', 14, 18],
      ['marginTop', 15, 50],
      ['marginBottom', 20, 20],
    ]),
    fontWeight: 'bold',
    lineHeight: 1.8,
  },
  link: {
    display: 'block',
    color: '#FFFFFF',
    textDecoration: 'underline',
  },
})

class HomepageHeroCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
  }

  componentDidMount() {
    const x = this.getConfig().left * this.props.canvasWidth,
      y =
        this.props.canvasHeight + this.getConfig().top * this.props.canvasWidth,
      width = this.getConfig().width * this.props.canvasWidth,
      height = this.getConfig().height * this.props.canvasWidth

    this.setState({
      x,
      y,
      width,
      height,
    })
    // add a hidden box behind the card within
    // the matter engine
    const body = Matter.Bodies.rectangle(
      x + width / 2,
      y + height / 2,
      width,
      height,
      {
        isStatic: true,
        render: {
          fillStyle: 'transparent',
        },
      }
    )
    this.body = body
    Matter.World.add(this.props.engine.world, body)
  }

  componentDidUpdate(prevProps) {
    if (this.props.is_open !== prevProps.is_open) {
      if (this.props.is_open) {
        this.open()
      } else {
        this.close()
      }
    }
  }

  getConfig = () => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia(constants.mq.desktop.replace('@media ', '')).matches
    ) {
      return this.props.desktop
    } else {
      return this.props.mobile
    }
  }

  open = () => {
    const target = {
      x: this.state.x,
      y: this.props.canvasHeight - this.state.height,
    }
    this.animate(target, 500)
  }

  close = () => {
    const target = {
      x: this.state.x,
      y:
        this.props.canvasHeight + this.getConfig().top * this.props.canvasWidth,
    }
    this.animate(target, 500)
  }

  animate = (target, duration) => {
    const startY = this.state.y
    let stop = false
    let start = null

    function startAnimation(timestamp) {
      start = timestamp
      draw(timestamp)
    }

    const draw = now => {
      if (stop) return
      if (now - start >= duration) stop = true
      let increment = easeOutQuint((now - start) / duration)
      let y = startY + (target.y - startY) * increment

      this.setState({
        x: target.x,
        y: y,
      })
      Matter.Body.setPosition(this.body, {
        x: target.x + this.state.width / 2,
        y: y + this.state.height / 2,
      })

      window.requestAnimationFrame(draw)
    }

    window.requestAnimationFrame(startAnimation)
  }

  handleLinkClick = ev => {
    ev.stopPropagation()
  }

  render() {
    const { classes } = this.props
    return (
      <div
        ref={el => {
          this.el = el
        }}
        style={{
          width: this.state.width,
          height: this.state.height,
          transform: `translate(${this.state.x}px, ${this.state.y}px)`,
        }}
        className={classes.card}
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <h2
          className={classNames({
            [classes.title]: true,
            [classes.titleClosed]: !this.props.is_open,
          })}
        >
          {this.props.title}
        </h2>
        <div
          className={classNames({
            [classes.content]: true,
            [classes.content_visible]: this.props.is_open,
          })}
        >
          <h3
            className={classes.headline}
            dangerouslySetInnerHTML={{ __html: this.props.headline }}
          />
          <p
            className={classes.copy}
            dangerouslySetInnerHTML={{ __html: this.props.copy }}
          />
          <div className={classes.links}>
            {this.props.links.map((link, i) => (
              <Link
                key={i}
                to={link.url}
                className={classes.link}
                onClick={this.handleLinkClick}
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(HomepageHeroCard)
