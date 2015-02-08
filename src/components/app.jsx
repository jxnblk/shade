/** @jsx React.DOM */

var React = require('react/addons');
var Header = require('./header.jsx');
//var Body = require('./body.jsx');
var Gradient = require('./gradient.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <Gradient>
        <Header {...this.props} />
      </Gradient>
    )
  }

});

