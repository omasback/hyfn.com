import { StyleRules, makeStyles } from '@material-ui/styles'

export const createStylesHook = <C extends string, P extends object>(
  styles: StyleRules<P, C>
) => makeStyles(styles)
