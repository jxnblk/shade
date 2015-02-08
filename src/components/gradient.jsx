/** @jsx React.DOM */

var React = require('react');
var Color = require('color');
var Background = require('./background.jsx');
var Header = require('./header.jsx');
var BaseColor = require('./base-color.jsx');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      base: '#00ccff',
      saturate: 0,
      lighten: 0,
      hueShift: -130,
      angle: -90,
      from: '#f6ff00',
      to: '#ff00a1',
      gradient: 'linear-gradient(-90deg, #f6ff00, #ff00a1)'
    }
  },

  changeBase: function(val) {
    this.setState({ base: val });
    this.updateColors();
  },

  // Spread
  changeSaturate: function(e) {
    this.setState({ saturate: e.target.value });
    this.updateColors();
  },

  changeLighten: function(e) {
    this.setState({ lighten: e.target.value });
    this.updateColors();
  },

  changeHueShift: function(e) {
    this.setState({ hueShift: e.target.value });
    this.updateColors();
  },


  linearGradient: function(deg, from, to) {
    return 'linear-gradient(' + deg + 'deg, ' + from + ', ' + to + ')';
  },


  updateColors: function() {
    var base, from, to;
    var base = Color(this.state.base);
    if (!base) return false;
    from = base.clone()
      .rotate(Number(this.state.hueShift))
      .saturate(this.state.saturate)
      .lighten(this.state.lighten)
      .hexString();
    to = base.clone()
      .rotate(-1 * Number(this.state.hueShift))
      .desaturate(this.state.saturate)
      .darken(this.state.lighten)
      .hexString();
    this.setState({
      from: from,
      to: to,
      gradient: this.linearGradient(this.state.angle, from, to)
    });
  },


  componentDidMount: function() {
    this.updateColors();
  },


  render: function() {

    var base = this.state.base;
    var saturate = this.state.saturate;
    var lighten = this.state.lighten;
    var hueShift = this.state.hueShift;
    var angle = this.state.angle;
    var from = this.state.from;
    var to = this.state.to;

    return (
      <div>
        <Background {...this.props} gradient={this.state.gradient}>
          <Header {...this.props} />
        </Background>
        <div className="sm-flex">
          <div className="sm-col-4 px2">
            <BaseColor {...this.props}
              base={base}
              changeBase={this.changeBase}
              updateColors={this.updateColors}/>
          </div>
          <div className="flex-auto"></div>
          <form className="sm-col-7 px2 py2">
            <hr className="sm-hide"/>
            <fieldset className="fieldset-reset no-select">
              <legend className="h3 bold lh-form mb2">Gradient Spread</legend>
              <div className="sm-flex mxn2">
                <div className="flex-auto px2">
                  <label className="h5 bold block">Hue Shift {hueShift}</label>
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

