const desktop = 1024

const constants = {
  colors: {
    black: '#1a1b23',
    red: '#ee3424',
    blue: '#3d3e99',
    yellow: '#e5a624',
    lightGray: '#e8e8e8',
    darkGray: '#3c3c40',
  },
  breakPoint: {
    desktop,
  },
  mq: {
    desktop: `@media (min-width: ${desktop}px)`,
  },
  triggerOnce: true,
  themeTransitionDuration: '0.5s',
}

export default constants
