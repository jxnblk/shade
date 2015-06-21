
var pkg = require('../package.json')

var data = {
  name: pkg.name,
  title: pkg.name,
  href: '/shade',
  version: pkg.version,
  description: pkg.description,
  keywords: pkg.keywords,
  links: [
    { href: '//github.com/jxnblk/shade', text: 'GitHub' }
  ]
}

module.exports = data

