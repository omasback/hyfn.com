import * as React from 'react'
import classNames from 'classnames'
import theme from '../../../styles/theme'
import { withStyles, createStyles } from '@material-ui/styles'

import decomp from 'poly-decomp'

import HomepageHeroCard from './HomepageHeroCard'

window.decomp = decomp;
const Matter = require('matter-js')


// setup logo shapes
let logo = {
  h: [[76.8, 42.3], [23.2, 42.3], [23.2, 16.2], [3.9, 16.2], [3.9, 83.8], [23.2, 83.8], [23.2, 57.7], [76.8, 57.7], [76.8, 83.8], [96.1, 83.8], [96.1, 16.2], [76.8, 16.2]],
  y: [[77.3, 16.2], [50, 46.7], [22.8, 16.2], [2, 16.2], [1, 17.4], [40.4, 60.6], [40.4, 83.8], [59.6, 83.8], [59.6, 60.6], [98.5, 17.9], [99, 17.4], [98, 16.2]],
  f: [[8.4, 83.8], [27.6, 83.8], [27.6, 57.5], [87.6, 57.5], [87.6, 42.4], [27.6, 42.4], [27.6, 31.6], [91.6, 31.6], [91.6, 16.2], [8.4, 16.2]],
  n: [[78.2, 63.4], [22.4, 16.3], [22.1, 16.2], [2.5, 16.2], [2.5, 83.8], [21.8, 83.8], [21.8, 38], [76, 83.8], [97.5, 83.8], [97.5, 16.2], [78.2, 16.2]],
};
for(var letter in logo) {
  logo[letter] = Matter.Bodies.fromVertices(0, 0, logo[letter].map((point) => {
      return Matter.Vector.create(point[0], point[1]);
    }), {
      render: {
        fillStyle: '#FFFFFF'
      }
    }
  );
  Matter.Body.scale(logo[letter], 2, 2);
}

// Material-UI's JSS implementation.
// Must use HOC version for class component
// https://material-ui.com/css-in-js/basics/
// autocomplete soon without createStyles? https://github.com/mui-org/material-ui/pull/15366
const styles = createStyles({
  root: {
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
  },
  title: {
    position: 'absolute',
    top: '48.5%',
    left: '0',
    transform: 'translateY(-50%)',
    height: 465,
    width: '100vw',
    margin: 0,
    fontWeight: 400,
    transition: 'opacity 1s',
  },
  title_hidden: {
    opacity: 0,
  },
  title_text: {
    position: 'relative',
    top: 17,
    display: 'block',
    fontSize: 140,
    lineHeight: '140px',
    textAlign: 'center',
    visibility: 'hidden',
  },
  title_super: {
    position: 'absolute',
    top: 0,
    left: '50%',
    paddingLeft: 50,
    display: 'block',
    fontSize: 40,
  },
  title_sub: {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    paddingLeft: 50,
    display: 'block',
    fontSize: 40,
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh'
  },
  cards: {
    position: 'absolute',
    bottom: 0,
    width: '100vw',
    zIndex: 1001,
  },
})

const secret = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

class HomepageHero extends React.Component {
  current_card = 0;

  constructor(props) {
    super(props);
    this.engine = Matter.Engine.create();

    this.state = {
      is_animation_started: false,
      is_playing: false,
      is_maybe_awesome: false,
      awesomeness: 0,
      cards: [],
    }

    for(var i = 0; i < 4; i++) {
      this.state.cards[i] = {
        is_open: false
      }
    }
  }

  componentDidMount() {
    const width = this.canvas.offsetWidth;
    const height = this.canvas.offsetHeight;

    const render = Matter.Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: width,
        height: height,
        background: 'transparent',
        wireframes: false,
        showAngleIndicator: false
      }
    });

    // add walls
    Matter.World.add(this.engine.world, [
      Matter.Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true, render: { visible: false }}), // ceiling
      Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true, render: { visible: false }}), // left wall
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true, render: { visible: false }}), // right wall
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true, render: { visible: false }}), // floor
    ]);

    // position logo letters
    const center = {
      x: width / 2,
      y: height / 2
    }
    Matter.Body.setPosition(logo.h, {x: center.x - 420, y: center.y - 33});
    Matter.Body.setPosition(logo.y, {x: center.x - 126, y: center.y - 46});
    Matter.Body.setPosition(logo.f, {x: center.x + 128, y: center.y - 50});
    Matter.Body.setPosition(logo.n, {x: center.x + 432, y: center.y - 34});
    
    // set letters to static for inital display
    // this can't be done in the letter constructor as that also
    // removes all rotation, friction, inertia, and velocity
    for(var letter in logo) {
      Matter.Body.setStatic(logo[letter], true);
    }

    // render logo letters
    Matter.World.add(this.engine.world, logo.h);
    Matter.World.add(this.engine.world, logo.y);
    Matter.World.add(this.engine.world, logo.f);
    Matter.World.add(this.engine.world, logo.n);

    // make the scene mouse interactive
    const mouse_constraint = Matter.MouseConstraint.create(this.engine, {
      element: this.canvas,
      constraint: {
        render: {
          visible: false
        },
        stiffness: 0.8
      }
    });
    const mouse = mouse_constraint.mouse;
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    Matter.World.add(this.engine.world, mouse_constraint);

    Matter.Engine.run(this.engine);
    Matter.Render.run(render);

    // listen for awesomeness
    document.addEventListener('keydown', this.onKeyDown);

    // start timing for animation
    this.timer = setTimeout(this.startAnimation, 1E3);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    this.stopAnimation();
  }

  startAnimation = () => {
    this.setState({is_animation_started: true}, () => {
      for(var letter in logo) {
        Matter.Body.setStatic(logo[letter], false);
      }

      // open the first card
      let { cards } = this.state;
      cards[this.current_card].is_open = true;
      this.setState({cards: cards});
      this.continueAnimation();
    });
  }

  continueAnimation = () => {
    this.animationInterval = window.setInterval(() => {
      this.openNextCard();
    }, 5E3);
  }

  stopAnimation = () => {
    window.clearInterval(this.animationInterval);
  }

  openNextCard = () => {
    let previous_card = this.current_card;
    this.current_card++;
    if(this.current_card === 4) {
      this.current_card = 0;
    }

    let { cards } = this.state;
    cards[previous_card].is_open = false;
    cards[this.current_card].is_open = true;
    this.setState({cards: cards});
  }

  handleCardClick = (id) => {
    // open the requested card
    this.stopAnimation();
    if(this.current_card !== id) {
      let { cards } = this.state;
      cards[this.current_card].is_open = false;
      cards[id].is_open = true;
      this.current_card = id;
      this.setState({cards: cards});
    }
  }

  handleCardEnter = (ev) => {
    this.stopAnimation();
  }

  handleCardLeave = (ev) => {
    this.continueAnimation();
  }

  onKeyDown = (ev) => {
    if(this.state.is_maybe_awesome) {
      this.detectAwesomeness(ev.keyCode);
    } else {
      if(ev.keyCode === secret[0]) {
        this.setState({is_maybe_awesome: true}, () => {
          this.detectAwesomeness(ev.keyCode);
        });
      }
    }
  }

  detectAwesomeness(keyCode) {
    if(this.state.is_maybe_awesome) {
      if(secret[this.state.awesomeness] === keyCode) {
        this.setState({awesomeness: this.state.awesomeness+1}, () => {
          this.isMaybeAwesome(); 
        });
      } else {
        this.isNotAwesome();
      }
    } else {
      this.isNotAwesome();
    }
  }

  isNotAwesome() {
    this.setState({
      is_maybe_awesome: false,
      awesomeness: 0
    });
  }

  isMaybeAwesome() {
    if(this.state.awesomeness === secret.length) {
      this.isAwesome();
    }
  }

  isAwesome() {
    // should really do something neat here
    console.log('awesome');
    //reset
    this.isNotAwesome();
  }

  render() {
    const { classes } = this.props

    const title_class = classNames({
      [classes.title]: true,
      [classes.title_hidden]: this.state.is_animation_started
    });

    return (
      <div className={classes.root}>
        <h1 className={title_class}>
          <span className={classes.title_super}>Welcome to</span>
          <span className={classes.title_text}>HYFN</span>
          <span className={classes.title_sub}>You've come <br />to the right place</span>
        </h1>
        <div className={classes.cards}>
          <HomepageHeroCard
            title='01 Optimization'
            headline='Wanting more content for less budget?'
            copy="We optimize like it's our job.<br />Because it is."
            links={[{
                url: '#',
                text: 'View solution'
            }, {
                url: '#',
                text: 'View work'
            }]}
            top={-100}
            left='0'
            color={theme.colors.blue}
            canvas={this.canvas}
            engine={this.engine}
            is_open={this.state.cards[0].is_open}
            onClick={(ev) => { this.handleCardClick(0) }}
            onMouseEnter={this.handleCardEnter}
            onMouseLeave={this.handleCardLeave}
          />
          <HomepageHeroCard
            title='02 Campaign'
            headline='Local Campaigns need a little love?'
            copy="We built a tool for that.<br />And it's awesome."
            links={[{
                url: '#',
                text: 'View solution'
            }, {
                url: '#',
                text: 'View work'
            }]}
            top={-140}
            left='14vw'
            color={theme.colors.black}
            canvas={this.canvas}
            engine={this.engine}
            is_open={this.state.cards[1].is_open}
            onClick={(ev) => { this.handleCardClick(1) }}
            onMouseEnter={this.handleCardEnter}
            onMouseLeave={this.handleCardLeave}
          />
          <HomepageHeroCard
            title='03 Amazon?'
            headline='Losing to Amazon?'
            copy="It's tough, they're a beast<br />But you can coexist."
            links={[{
                url: '#',
                text: 'View solution'
            }, {
                url: '#',
                text: 'View work'
            }]}
            top={-120}
            left='35vw'
            color={theme.colors.red}
            canvas={this.canvas}
            engine={this.engine}
            is_open={this.state.cards[2].is_open}
            onClick={(ev) => { this.handleCardClick(2) }}
            onMouseEnter={this.handleCardEnter}
            onMouseLeave={this.handleCardLeave}
          />
          <HomepageHeroCard
            title='04 Platform'
            headline='Tired of being boxed into solutions?'
            copy="We do things the platforms can't.<br />(Even you, Facebook)"
            links={[{
                url: '#',
                text: 'View solution'
            }, {
                url: '#',
                text: 'View work'
            }]}
            top={-100}
            left='60vw'
            color={theme.colors.yellow}
            canvas={this.canvas}
            engine={this.engine}
            is_open={this.state.cards[3].is_open}
            onClick={(ev) => { this.handleCardClick(3) }}
            onMouseEnter={this.handleCardEnter}
            onMouseLeave={this.handleCardLeave}
          />
        </div>
        <canvas ref={el => this.canvas = el} className={classes.canvas}></canvas>
      </div>
    )
  }
}

export default withStyles(styles)(HomepageHero)
