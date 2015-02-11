/** @jsx React.DOM */

var React = require('react');
var Color = require('color');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      base: this.props.base,
      hue: 0,
      saturation: 0,
      lightness: 0,
    }
  },

  changeBase: function(e) {
    this.setState({ base: e.target.value });
    this.updateHSL();
    this.props.changeBase(this.state.base);
  },

  changeHue: function(e) {
    this.setState({ hue: e.target.value });
    this.updateBase();
  },

  changeSaturation: function(e) {
    this.setState({ saturation: e.target.value });
    this.updateBase();
  },

  changeLightness: function(e) {
    this.setState({ lightness: e.target.value });
    this.updateBase();
  },

  updateHSL: function() {
    var base, h, s, l;
    base = Color(this.state.base);
    h = base.hsl().h;
    s = base.hsl().s;
    l = base.hsl().l;
    this.setState({
      hue: h,
      saturation: s,
      lightness: l
    });
  },

  updateBase: function() {
    var base, hsl;
    hsl = {
      h: this.state.hue,
      s: this.state.saturation,
      l: this.state.lightness
    };
    base = Color(hsl).hexString();
    this.setState({ base: base });
    this.props.changeBase(this.state.base);
  },

  handleSubmit: function(e) {
    var base = e.target[1].value || null;
    e.preventDefault();
    if (base) {
      this.setState({ base: base });
    }
    this.updateHSL();
    this.props.changeBase(this.state.base);
  },

  componentDidMount: function() {
    this.updateHSL();
  },

  render: function() {
    var base = this.state.base;
    var hue = this.state.hue;
    var saturation = this.state.saturation;
    var lightness = this.state.lightness;
    return (
      <form onSubmit={this.handleSubmit}>
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
              <label className="h5 bold block">Hue {hue}&deg;</label>
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
      </form>
    )
  }

});

