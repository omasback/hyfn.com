const desktop = 1024

const constants = {
  colors: {
    black: '#1a1b23',
    red: '#ee3424',
    blue: '#3d3e99',
    yellow: '#e5a624',
    lightGray: '#f0f2f5',
    darkGray: '#3c3c40',
  },
  breakPoint: {
    desktop,
  },
  mq: {
    desktop: `@media (min-width: ${desktop}px)`,
    hoverDevice: '@media (hover: hover) and (pointer: fine)',
    portrait: '@media (orientation: portrait)',
    landscape: '@media (orientation: landscape)',
  },
  triggerOnce: true,
  themeTransitionDuration: '0.5s',
}

export default constants
