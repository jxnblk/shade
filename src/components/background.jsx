/** @jsx React.DOM */

var React = require('react');

module.exports = React.createClass({

  render: function() {
    var style = {
      backgroundImage: this.props.gradient,
      height: '80vh'
    };
    var preClass = 'h5 right-align m0 ';
    preClass += this.props.light ? 'black' : 'white';
    return (
      <div style={style}>
        <div className="flex flex-column full-height">
          <div className="p3">
            {this.props.children}
          </div>
          <div className="flex-auto"></div>
          <pre className={preClass}>background-image: {this.props.gradient};</pre>
        </div>
      </div>
    )
  }

});

