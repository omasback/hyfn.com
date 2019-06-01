import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

import constants from 'styles/constants'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  a: {
    fontWeight: 'bold',
  },
  leftTd: {
    whiteSpace: 'nowrap',
    padding: 20,
  },
  colors: {},
  color: {
    margin: 10,
  },
  colorRectanlge: {
    width: 220,
    height: 120,
    marginBottom: 4,
  },
})

const Styleguide: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles({})

  return (
    <div className={classes.root}>
      <table>
        <tbody>
          {[
            {
              font: 'Moderat Bold',
              size: 210,
              content: <h1 style={{ margin: 0 }}>STILL HERE?</h1>,
            },
            {
              font: 'Moderat Bold',
              size: 100,
              content: <h2>Skyzone</h2>,
            },
            {
              font: 'Moderat Bold',
              size: 38,
              content: <h3>We should get to know each other.</h3>,
            },
            {
              font: 'Moderat Light',
              size: 28,
              content: (
                <p style={{ fontSize: 28, maxWidth: 580 }}>
                  So lay it on us. Come with questions. Come confused. Come
                  expecting guidance. And don’t come with socks, because they’ll
                  definitely get blown off. .
                </p>
              ),
            },
            {
              font: 'Moderat Light',
              size: 18,
              content: (
                <p style={{ fontSize: 18, maxWidth: 320 }}>
                  But before we can give you those answers, we need to know a
                  little more about you, your brand, and your expectations.
                </p>
              ),
            },
            {
              font: 'Moderat Bold',
              size: 18,
              content: (
                // eslint-disable-next-line
                <a style={{ fontSize: 18 }} className={classes.a}>
                  Might as well get in touch ->
                </a>
              ),
            },
          ].map(config => (
            <tr key={config.size + config.font}>
              <td className={classes.leftTd}>
                {config.font}
                <br />
                {config.size} pt
              </td>
              <td>{config.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.colors}>
        {Object.keys(constants.colors).map((color: string) => (
          <div className={classes.color} key={color}>
            <div
              className={classes.colorRectanlge}
              style={{ backgroundColor: constants.colors[color] }}
            />
            {color}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Styleguide
