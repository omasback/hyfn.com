import constants from 'styles/constants'

const cardConfigs = [
  {
    title: 'Content',
    headline: 'Wanting more content for less budget?',
    copy: "We optimize like it's our job.<br />Because it is.",
    links: [
      {
        url: '/solutions',
        text: 'View solution',
      },
      {
        url: '/work',
        text: 'View work',
      },
    ],
    mobile: {
      top: -0.42,
      left: 0.1,
      width: 0.9,
      height: 1.1,
    },
    desktop: {
      top: -0.069,
      left: 0,
      width: 0.4,
      height: 0.39,
    },
    color: constants.colors.blue,
  },
  {
    title: 'Localization',
    headline: 'Local Campaigns need a little love?',
    copy: "We built a tool for that.<br />And it's awesome.",
    links: [
      {
        url: '/solutions',
        text: 'View solution',
      },
      {
        url: '/work',
        text: 'View work',
      },
    ],
    mobile: {
      top: -0.32,
      left: 0,
      width: 0.74,
      height: 1,
    },
    desktop: {
      top: -0.097,
      left: 0.14,
      width: 0.4,
      height: 0.39,
    },
    color: constants.colors.black,
  },
  {
    title: 'E-Commerce',
    headline: 'Losing to Amazon?',
    copy: "It's tough, they're a beast<br />But you can coexist.",
    links: [
      {
        url: '/solutions',
        text: 'View solution',
      },
      {
        url: '/work',
        text: 'View work',
      },
    ],
    mobile: {
      top: -0.21,
      left: 0.21,
      width: 0.79,
      height: 1,
    },
    desktop: {
      top: -0.083,
      left: 0.35,
      width: 0.4,
      height: 0.39,
    },
    color: constants.colors.red,
  },
  {
    title: 'Customization',
    headline: 'Tired of being boxed into solutions?',
    copy: "We do things the platforms can't.<br />(Even you, Facebook)",
    links: [
      {
        url: '/solutions',
        text: 'View solution',
      },
      {
        url: '/work',
        text: 'View work',
      },
    ],
    mobile: {
      top: -0.11,
      left: 0.0,
      width: 0.9,
      height: 1,
    },
    desktop: {
      top: -0.069,
      left: 0.6,
      width: 0.4,
      height: 0.39,
    },
    color: constants.colors.yellow,
  },
]

export default cardConfigs
