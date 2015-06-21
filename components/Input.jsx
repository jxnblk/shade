/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <input type="text"
        className="mb0 field-light"
        onBlur={this.props.onBlur}
        valueLink={this.props.valueLink} />
    )
  }

});

