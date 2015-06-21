
/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.readme}} />
    )
  }

});

