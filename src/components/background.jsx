
var React = require('react');
var Ad = require('./ad.jsx');

module.exports = React.createClass({

  render: function() {
    var style = {
      backgroundImage: this.props.gradient,
      minHeight: '80vh'
    };
    var preClass = 'h5 right-align m0 ';
    preClass += this.props.light ? 'black' : 'white';
    return (
      <div style={style} className="flex flex-column">
        <div className="p3">
          {this.props.children}
        </div>
        <div className="flex-auto"></div>
        <div className="right-align">
          <Ad light={this.props.light} />
        </div>
        <pre className={preClass}>background-image: {this.props.gradient};</pre>
      </div>
    )
  }

});

