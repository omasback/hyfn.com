import { StyleRules, makeStyles } from '@material-ui/styles'
import { WithStylesOptions } from '@material-ui/styles/withStyles'

export const createStylesHook = <C extends string, P extends object>(
  styles: StyleRules<P, C>,
  options?: WithStylesOptions
) => makeStyles(styles, options)
