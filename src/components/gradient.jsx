/** @jsx React.DOM */

var React = require('react');
var Background = require('./background.jsx');
var Color = require('color');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      base: '#00ccff',
      baseH: 0,
      baseS: 0,
      baseL: 0,
      saturate: 0,
      lighten: 0,
      hueShift: -130,
      angle: -90,
      from: '#f6ff00',
      to: '#ff00a1',
      gradient: 'linear-gradient(90deg, #f6ff00, #ff00a1)'
    }
  },


  // Base Color
  changeBase: function(e) {
    this.setState({ base: e.target.value });
    this.updateHSL();
    this.updateColors();
  },

  changeHue: function(e) {
    this.setState({ baseH: e.target.value });
    this.updateBase();
  },

  changeSaturation: function(e) {
    this.setState({ baseS: e.target.value });
    this.updateBase();
  },

  changeLightness: function(e) {
    this.setState({ baseL: e.target.value });
    this.updateBase();
  },

  updateBase: function() {
    var base, hsl;
    hsl = { h: this.state.baseH, s: this.state.baseS, l: this.state.baseL };
    base = Color(hsl).hexString();
    this.setState({ base: base });
    this.updateColors();
  },

  updateHSL: function() {
    var base, h, s, l;
    base = Color(this.state.base);
    h = base.hsl().h;
    s = base.hsl().s;
    l = base.hsl().l;
    this.setState({
      baseH: h,
      baseS: s,
      baseL: l
    });
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


  handleSubmit: function(e) {
    var base = e.target[1].value || null;
    e.preventDefault();
    if (base) {
      this.setState({ base: base });
    }
    this.updateColors();
  },

  componentDidMount: function() {
    this.updateHSL();
    this.updateColors();
  },


  render: function() {

    var base = this.state.base;
    var hue = this.state.baseH;
    var saturation = this.state.baseS;
    var lightness = this.state.baseL;
    var saturate = this.state.saturate;
    var lighten = this.state.lighten;
    var hueShift = this.state.hueShift;
    var angle = this.state.angle;
    var from = this.state.from;
    var to = this.state.to;
    var colorInputStyle = { backgroundColor: base };

    return (
      <div>
        <Background {...this.props} gradient={this.state.gradient}>
          <div className="flex flex-column full-height">
            <div className="p3">
              {this.props.children}
            </div>
            <div className="flex-auto"></div>
            <pre className="h5 right-align m0 white">background-image: {this.state.gradient};</pre>
          </div>
        </Background>
        <form className="sm-flex" onSubmit={this.handleSubmit}>
          <div className="sm-col-4 px2">
            <fieldset className="fieldset-reset py2">
              <div className="flex flex-center mb2">
                <label className="h4 bold flex-none mr2">Base Color</label>
                <input type="text"
                  value={base}
                  onBlur={this.changeBase}
                  onChange={this.changeBase}
                  className="m0 flex-auto field-light" />
              </div>
              <div className="sm-flex mxn2 no-select">
                <div className="flex-auto px2">
                  <label className="h5 bold block">Hue {hue}</label>
                  <input type="range" value={hue}
                    min="0" max="360"
                    onBlur={this.changeHue}
                    onChange={this.changeHue}
                    className="full-width dark-gray range-light" />
                </div>
                <div className="flex-auto px2">
                  <label className="h5 bold block">Saturation {saturation}</label>
                  <input type="range" value={saturation}
                    min="0" max="100"
                    onBlur={this.changeSaturation}
                    onChange={this.changeSaturation}
                    className="full-width dark-gray range-light" />
                </div>
                <div className="flex-auto px2">
                  <label className="h5 bold block">Lightness {lightness}</label>
                  <input type="range" value={lightness}
                    min="0" max="100"
                    onBlur={this.changeLightness}
                    onChange={this.changeLightness}
                    className="full-width dark-gray range-light" />
                </div>
              </div>
            </fieldset>
          </div>
          <div className="flex-auto"></div>
          <div className="sm-col-7 px2 py2">
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
          </div>
        </form>
      </div>
    )

  }


});

