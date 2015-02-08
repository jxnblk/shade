/** @jsx React.DOM */

var React = require('react');
//var Input = require('./input.jsx');

module.exports = React.createClass({

  render: function() {
    return (
      <header className="flex flex-center flex-wrap white">
        <div className="flex-auto">
          <h1 className="m0">
            {this.props.name}
            <span className="h4"> v{this.props.version}</span>
          </h1>
          <p className="m0">{this.props.description}</p>
        </div>
      </header>
    )
  }

});

