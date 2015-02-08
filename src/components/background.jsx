/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    var style = {
      backgroundImage: this.props.gradient,
      minHeight: '70vh'
    };
    return (
      <div style={style} className="p3">
        {this.props.children}
      </div>
    )
  }

});

