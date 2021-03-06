import * as React from 'react'
import { withStyles, createStyles } from '@material-ui/styles'
import * as cx from 'classnames'

import decomp from 'poly-decomp'

import { fullScreen } from 'styles/mixins'
import constants from 'styles/constants'

const Matter = require('matter-js')

// Material-UI's JSS implementation.
// Must use HOC version for class component
// https://material-ui.com/css-in-js/basics/
// autocomplete soon without createStyles? https://github.com/mui-org/material-ui/pull/15366
const styles = createStyles({
  root: {
    extend: fullScreen(),
    position: 'relative',
    overflow: 'hidden',
    opacity: 0,
    transition: 'opacity 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootMounted: {
    opacity: 1,
  },
  title: {
    fontWeight: 400,
    transition: 'opacity 1s',
    transitionDelay: '500ms',
    opacity: 0,
    fontSize: 40,
  },
  titleVisible: {
    opacity: 1,
  },
  canvas: {
    display: 'none',
    [constants.mq.hoverDevice]: {
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
    },
  },
  cards: {},
})

let logo

// const el = document.createElement('div')
// el.style.width = '100vw'
// el.style.height = '100vh'
// el.style.position = 'fixed'
// el.style.pointerEvents = 'none'
// el.style.zIndex = '-1'
// document.body.append(el)

class HomepageHero extends React.Component {
  current_card = 0

  constructor(props) {
    super(props)

    this.engine = Matter.Engine.create()

    this.state = {
      is_animation_started: false,
      is_playing: false,
      cards: [],
      width: 0,
      height: 0,
      mounted: false,
    }

    for (var i = 0; i < 4; i++) {
      this.state.cards[i] = {
        is_open: false,
      }
    }

    if (typeof window === 'undefined') return

    // setup logo shapes
    logo = {
      h: [
        [76.8, 42.3],
        [23.2, 42.3],
        [23.2, 16.2],
        [3.9, 16.2],
        [3.9, 83.8],
        [23.2, 83.8],
        [23.2, 57.7],
        [76.8, 57.7],
        [76.8, 83.8],
        [96.1, 83.8],
        [96.1, 16.2],
        [76.8, 16.2],
      ],
      y: [
        [77.3, 16.2],
        [50, 46.7],
        [22.8, 16.2],
        [2, 16.2],
        [1, 17.4],
        [40.4, 60.6],
        [40.4, 83.8],
        [59.6, 83.8],
        [59.6, 60.6],
        [98.5, 17.9],
        [99, 17.4],
        [98, 16.2],
      ],
      f: [
        [8.4, 83.8],
        [27.6, 83.8],
        [27.6, 57.5],
        [87.6, 57.5],
        [87.6, 42.4],
        [27.6, 42.4],
        [27.6, 31.6],
        [91.6, 31.6],
        [91.6, 16.2],
        [8.4, 16.2],
      ],
      n: [
        [78.2, 63.4],
        [22.4, 16.3],
        [22.1, 16.2],
        [2.5, 16.2],
        [2.5, 83.8],
        [21.8, 83.8],
        [21.8, 38],
        [76, 83.8],
        [97.5, 83.8],
        [97.5, 16.2],
        [78.2, 16.2],
      ],
    }

    window.decomp = decomp

    for (var letter in logo) {
      let letterBody = (logo[letter] = Matter.Bodies.fromVertices(
        0,
        0,
        logo[letter].map(point => {
          return Matter.Vector.create(point[0], point[1])
        }),
        {
          restitution: 0.75,
          render: {
            fillStyle: '#FFFFFF',
          },
        }
      ))

      Matter.Body.scale(letterBody, 2, 2)
      letterBody.letter = letter
    }

    // const colorOptions = [
    //   constants.colors.blue,
    //   constants.colors.red,
    //   constants.colors.yellow,
    //   constants.colors.black,
    // ]

    // Matter.Events.on(this.engine, 'collisionStart', event => {
    //   event.pairs.forEach(pair => {
    //     pair.bodyA.parent.render.fillStyle =
    //       colorOptions[Math.floor(Math.random() * colorOptions.length)]
    //     pair.bodyB.parent.render.fillStyle =
    //       colorOptions[Math.floor(Math.random() * colorOptions.length)]
    //   })
    // })

    this.state.width = window.innerWidth
    this.state.height = window.innerHeight

    window.addEventListener('resize', this.onResize)
  }

  componentDidMount() {
    const width = this.state.width
    const height = this.state.height

    const render = Matter.Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        background: 'transparent',
        wireframes: false,
        showAngleIndicator: false,
      },
    })

    this.matterRender = render

    // add walls
    Matter.World.add(this.engine.world, [
      Matter.Bodies.rectangle(width / 2, -25, width, 50, {
        isStatic: true,
        render: { visible: false },
      }), // ceiling
      Matter.Bodies.rectangle(-25, height / 2, 50, height, {
        isStatic: true,
        render: { visible: false },
      }), // left wall
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
        isStatic: true,
        render: { visible: false },
      }), // right wall
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
        isStatic: true,
        render: { visible: false },
      }), // floor
    ])

    // position logo letters
    const center = {
      x: width / 2,
      y: height / 2,
    }
    Matter.Body.setPosition(logo.h, { x: center.x - 420, y: center.y - 33 })
    Matter.Body.setPosition(logo.y, { x: center.x - 126, y: center.y - 46 })
    Matter.Body.setPosition(logo.f, { x: center.x + 128, y: center.y - 50 })
    Matter.Body.setPosition(logo.n, { x: center.x + 432, y: center.y - 34 })

    // set letters to static for inital display
    // this can't be done in the letter constructor as that also
    // removes all rotation, friction, inertia, and velocity
    for (var letter in logo) {
      Matter.Body.setStatic(logo[letter], true)
    }

    // render logo letters
    Matter.World.add(this.engine.world, logo.h)
    Matter.World.add(this.engine.world, logo.y)
    Matter.World.add(this.engine.world, logo.f)
    Matter.World.add(this.engine.world, logo.n)

    // make the scene mouse interactive
    const mouse_constraint = Matter.MouseConstraint.create(this.engine, {
      element: this.canvas,
      constraint: {
        render: {
          visible: false,
        },
        stiffness: 0.8,
      },
    })
    const mouse = mouse_constraint.mouse
    mouse.element.removeEventListener('mousewheel', mouse.mousewheel)
    mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    Matter.World.add(this.engine.world, mouse_constraint)

    Matter.Engine.run(this.engine)
    Matter.Render.run(render)

    // start timing for animation
    this.timer = setTimeout(this.startAnimation, 1e3)

    this.setState({
      mounted: true,
    })
  }

  componentWillUnmount() {
    this.stopAnimation()
    Matter.Render.stop(this.debugRender) // this only stop renderer but not destroy canvas
    Matter.World.clear(this.engine.world)
    Matter.Engine.clear(this.engine)
    this.matterRender.canvas.remove()
    this.matterRender.canvas = null
    this.matterRender.context = null
    this.matterRender.textures = {}
  }

  onResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  startAnimation = () => {
    this.setState({ is_animation_started: true }, () => {
      for (var letter in logo) {
        Matter.Body.setStatic(logo[letter], false)
      }

      // open the first card
      let { cards } = this.state
      cards[this.current_card].is_open = true
      this.setState({ cards: cards })
      this.continueAnimation()
    })
  }

  continueAnimation = () => {
    this.animationInterval = window.setInterval(() => {
      this.openNextCard()
    }, 5e3)
  }

  stopAnimation = () => {
    window.clearInterval(this.animationInterval)
  }

  openNextCard = () => {
    let previous_card = this.current_card
    this.current_card++
    if (this.current_card === 4) {
      this.current_card = 0
    }

    let { cards } = this.state
    cards[previous_card].is_open = false
    cards[this.current_card].is_open = true
    this.setState({ cards: cards })
  }

  handleCardClick = id => {
    // open the requested card
    this.stopAnimation()
    if (this.current_card !== id) {
      let { cards } = this.state
      cards[this.current_card].is_open = false
      cards[id].is_open = true
      this.current_card = id
      this.setState({ cards: cards })
    }
  }

  handleCardEnter = ev => {
    this.stopAnimation()
  }

  handleCardLeave = ev => {
    this.continueAnimation()
  }

  render() {
    const { classes } = this.props

    return (
      <div
        className={cx(classes.root, {
          [classes.rootMounted]: this.state.mounted,
        })}
      >
        <h1
          className={cx(classes.title, {
            [classes.titleVisible]: this.state.is_animation_started,
          })}
        >
          Oops! 404
        </h1>
        <canvas
          ref={el => (this.canvas = el)}
          className={classes.canvas}
          // style={{ width: this.state.width, height: this.state.height }}
        />
      </div>
    )
  }
}

export default withStyles(styles)(HomepageHero)
