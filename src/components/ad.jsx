
var React = require('react');

var Ad = React.createClass({

  render: function() {
    var className = 'inline-block ' + (this.props.light ? 'black' : 'white');
    return (
      <div className={className}>
        <script async type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1696&serve=CVYD42T&placement=jxnblkcom" id="_carbonads_js"></script>
      </div>
    )
  }

});

module.exports = Ad;

