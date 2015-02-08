/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    var style = {
      backgroundImage: this.props.gradient,
      height: '80vh'
    };
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )
  }

});

