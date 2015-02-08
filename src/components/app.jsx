/** @jsx React.DOM */

var React = require('react');
var Gradient = require('./gradient.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <Gradient {...this.props} />
    )
  }

});

