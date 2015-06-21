
var React = require('react')
var Root = require('./components/Root.jsx')

if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML)
  Router.run(Routes, Router.HistoryLocation, function (Handler) {
    React.render(React.createElement(Handler, initialProps), document)
  })
}

module.exports = function render(locals, callback) {
  var html = React.renderToString(React.createElement(Root, locals))
  callback(null, '<!DOCTYPE html>' + html)
}

