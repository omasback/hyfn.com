import * as React from 'react'
import Nav from './Nav'
import { makeStyles } from '@material-ui/styles'
import Footer from './Footer'
import { ThemeContext } from 'components/App'

const useStyles = makeStyles({
  root: {
    padding: 0,
    transition: 'background-color 1s',
  },
})

const PageWrapper: React.FunctionComponent<{}> = ({ children }) => {
  const classes = useStyles()
  const theme = React.useContext(ThemeContext)

  return (
    <div
      className={classes.root}
      id="outer-container"
      style={{ backgroundColor: theme.backgroundColor, color: theme.color }}
    >
      <Nav />
      <main id="page-wrap">{children}</main>
      <Footer />
    </div>
  )
}

export default PageWrapper
