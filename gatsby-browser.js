const { detect } = require('detect-browser')
const browser = detect()

exports.onClientEntry = () => {
  if (
    browser.name === 'ie' &&
    window.location.href.indexOf('/unsupported-browser') === -1
  ) {
    window.location.href = '/unsupported-browser'
  }
}
