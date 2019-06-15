import * as React from 'react'
import classNames from 'classnames'
import { withStyles, createStyles } from '@material-ui/styles'
import { Link } from 'gatsby'

const Matter = require('matter-js')

function inOutQuad(n) {
  n *= 2;
  if(n < 1) return 0.5 * n * n;
  return - 0.5 * (--n * (n - 2) -1);
}

const styles = createStyles({
  card: {
    position: 'absolute', 
    width: '40vw',
    padding: 40,
    paddingBottom: 140,
    color: '#FFFFFF',
    cursor: 'pointer',
  },
  content: {
    opacity: 0,
    transition: 'opacity 500ms',
  },
  content_visible: {
    opacity: 1,
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 400,
  },
  headline: {
    marginTop: 60,
    marginBottom: 40,
    fontSize: 40,
    fontWeight: 400,
    lineHeight: '48px',
  },
  copy: {
    fontSize: 25,
    fontWeight: 400,
    lineHeight: '37px',
  },
  links: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 400,
    lineHeight: '30px',
  },
  link: {
    display: 'block',
    color: '#FFFFFF',
    textDecoration: 'underline',
  }
})

class HomepageHeroCard extends React.Component {
  componentDidMount() {
    // add a hidden box behind the card within
    // the matter engine
    const height = window.innerHeight;
    const style = window.getComputedStyle(this.el);
    const x = this.el.offsetLeft + (this.el.offsetWidth / 2);
    const y = height + this.el.offsetTop + (this.el.offsetHeight / 2);
    const body = Matter.Bodies.rectangle(x, y, this.el.offsetWidth, this.el.offsetHeight, {
      isStatic: true,
      render: {
        fillStyle: style.backgroundColor
      }
    });
    this.body = body;
    Matter.World.add(this.props.engine.world, body);
  }

  componentDidUpdate(prevProps) {
    if(this.props.is_open !== prevProps.is_open) {
      if(this.props.is_open) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  open() {
    const el_target = - this.el.offsetHeight;
    const body_target = window.innerHeight - (this.el.offsetHeight / 2);
    this.animate(el_target, body_target, 500);
  }

  close = () => {
    const el_target = this.props.top;
    const body_target = window.innerHeight + this.props.top + (this.el.offsetHeight / 2);
    this.animate(el_target, body_target, 500);
  }

  animate = (el_target, body_target, duration) => {
    const { el, body } = this;
    const el_start = el.offsetTop;
    const body_start = body.position.y;
    let stop = false;
    let start = null;

    function startAnimation(timestamp) {
      start = timestamp;
      draw(timestamp);
    }

    function draw(now) {
      if(stop) return;
      if(now - start >= duration) stop = true;
      let increment = inOutQuad((now - start) / duration);
      let el_top = el_start + (el_target - el_start) * increment;
      let body_y = body_start + (body_target - body_start) * increment;

      el.style['top'] = `${el_top}px`;
      Matter.Body.setPosition(body, {
        x: body.position.x,
        y: body_y
      });

      window.requestAnimationFrame(draw);
    }

    window.requestAnimationFrame(startAnimation);
  }

  handleLinkClick = ev => {
    console.log('link was clicked')
    ev.stopPropagation()
  }

  render() {
    const { classes } = this.props
    const style = {
      top: this.props.top,
      left: this.props.left,
      backgroundColor: this.props.color
    }
    const content_class = classNames({
      [classes.content]: true,
      [classes.content_visible]: this.props.is_open
    });
    return (
      <div ref={el => {this.el = el}}
        className={classes.card}
        style={style}
        onClick={this.props.onClick}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
        <h2 className={classes.title}>{this.props.title}</h2>
        <div className={content_class}>
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
