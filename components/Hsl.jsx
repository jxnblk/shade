/** @jsx React.DOM */

var React = require('react');
var Color = require('color');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      hex: this.props.valueLink,
      hue: this.props.values.hsl[0],
      saturation: this.props.values.hsl[1],
      lightness: this.props.values.hsl[2]
    }
  },

  updateHue: function(e) {
    this.setState({ hue: e.target.value });
    this.updateColor();
  },

  updateSaturation: function(e) {
    this.setState({ saturation: e.target.value });
    this.updateColor();
  },

  updateLightness: function(e) {
    this.setState({ lightness: e.target.value });
    this.updateColor();
  },

  updateColor: function() {
    var color = Color().hsl(this.state.hue, this.state.saturation, this.state.lightness);
    console.log(color.hexString());
    this.setState({ hex: color.hexString() });
    this.props.onChange();
  },

  render: function() {
    var hue = this.state.hue;
    var saturation = this.state.saturation;
    var lightness = this.state.lightness;
    return (
      <div>
        <label className="block">Hue</label>
        <input type="range"
          value={hue}
          min="0"
          max="360"
          onChange={this.updateHue}
          className="block full-width"/>
        <label className="block">Saturation</label>
        <input type="range"
          value={saturation}
          min="0"
          max="100"
          onChange={this.updateSaturation}
          className="block full-width"/>
        <label className="block">Lightness</label>
        <input type="range"
          value={lightness}
          min="0"
          max="100"
          onChange={this.updateLightness}
          className="block full-width"/>
      </div>
    )
  }

});

