/** @jsx React.DOM */

var React = require('react');
var _ = require('lodash');
var Color = require('color');
var Background = require('./background.jsx');
var Header = require('./header.jsx');
var BaseColor = require('./base-color.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    var obj = {};
    try {
      var params = window.location.search;
      obj = this.parseQueryString(params);
      if (obj.base) {
        obj.base = '#' + obj.base;
      }
    } catch(e) {
    }
    _.defaults(obj, {
      base: '#00ccff',
      saturate: 0,
      lighten: 0,
      hueShift: -130,
      angle: -90,
    });
    return obj
  },

  changeBase: function(val) {
    this.setState({ base: val }, this.updateUrl);
  },

  // Spread
  changeSaturate: function(e) {
    this.setState({ saturate: e.target.value }, this.updateUrl);
  },

  changeLighten: function(e) {
    this.setState({ lighten: e.target.value }, this.updateUrl);
  },

  changeHueShift: function(e) {
    this.setState({ hueShift: e.target.value }, this.updateUrl);
  },


  linearGradient: function(deg, from, to) {
    return 'linear-gradient(' + deg + 'deg, ' + from + ', ' + to + ')';
  },

  queryString: function(obj) {
    var qs = _.reduce(obj, function(result, value, key) {
      if (typeof value == 'string') { value = value.replace('#', ''); }
      return result += key + '=' + value + '&';
    }, '').slice(0, -1);
    return qs;
  },

  parseQueryString: function(str) {
    var pairs,
        obj = {};
    str = str.replace('?', '');
    pairs = str.split('&');
    pairs.forEach(function(pair) {
      var keyVal = pair.split('=');
      obj[keyVal[0]] = keyVal[1];
    });
    return obj;
  },

  updateUrl: _.debounce(function() {
    var qs = this.queryString({
      base: this.state.base,
      hueShift: this.state.hueShift,
      saturate: this.state.saturate,
      lighten: this.state.lighten
    });
    window.history.pushState(this.state , '', '?' + qs);
  }, 200),


  render: function() {

    var base = this.state.base;
    var saturate = this.state.saturate;
    var lighten = this.state.lighten;
    var hueShift = this.state.hueShift;
    var angle = this.state.angle;

    var baseColor = Color(base);
    var from = baseColor.clone()
      .rotate(Number(this.state.hueShift))
      .saturate(this.state.saturate)
      .lighten(this.state.lighten)
      .hexString();
    var to = baseColor.clone()
      .rotate(-1 * Number(this.state.hueShift))
      .desaturate(this.state.saturate)
      .darken(this.state.lighten)
      .hexString();
    var gradient = this.linearGradient(angle, from, to);

    var light = baseColor.light();

    return (
      <div>
        <Background {...this.props} gradient={gradient} light={light}>
          <Header {...this.props} light={light} />
        </Background>
        <div className="md-flex">
          <div className="md-col-6 lg-col-5 px2">
            <BaseColor {...this.props}
              base={base}
              changeBase={this.changeBase}/>
          </div>
          <div className="flex-auto"></div>
          <form className="md-col-6 px2 py2">
            <hr className="sm-hide"/>
            <fieldset className="fieldset-reset no-select">
              <legend className="h4 bold lh-form mb2">Gradient Spread</legend>
              <div className="sm-flex mxn2">
                <div className="flex-auto px2">
                  <label className="h5 bold block">Hue Shift {hueShift}&deg;</label>
                  <input type="range" value={hueShift}
                    min="-180" max="180"
                    onBlur={this.changeHueShift}
                    onChange={this.changeHueShift}
                    className="full-width dark-gray range-light" />
                </div>
                <div className="flex-auto px2">
                  <label className="h5 bold block">Saturate {saturate}</label>
                  <input type="range" value={saturate}
                    min="-1" max="1" step="0.01"
                    onBlur={this.changeSaturate}
                    onChange={this.changeSaturate}
                    className="full-width dark-gray range-light" />
                </div>
                <div className="flex-auto px2">
                  <label className="h5 bold block">Lighten {lighten}</label>
                  <input type="range" value={lighten}
                    min="-1" max="1" step="0.01"
                    onBlur={this.changeLighten}
                    onChange={this.changeLighten}
                    className="full-width dark-gray range-light" />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )

  }


});

