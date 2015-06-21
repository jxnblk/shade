
import React from 'react'
import _ from 'lodash'
import Color from 'color'
import qs from 'qs'
import Background from './Background.jsx'
import Header from './Header.jsx'
import BaseColor from './BaseColor.jsx'


class Gradient extends React.Component {

  constructor () {
    super ()
    this.changeBase = this.changeBase.bind(this)
    this.changeSaturate = this.changeSaturate.bind(this)
    this.changeLighten = this.changeLighten.bind(this)
    this.changeHueShift = this.changeHueShift.bind(this)
    this.linearGradient = this.linearGradient.bind(this)
    this.updateUrl = _.debounce(function() {
      console.log('updateUrl')
      let params = qs.stringify({
        base: this.state.base,
        hueShift: this.state.hueShift,
        saturate: this.state.saturate,
        lighten: this.state.lighten
      })
      window.history.pushState(this.state , '', '?' + params)
    }, 200)
    this.state = {
      base: '#00ccff',
      saturate: 0,
      lighten: 0,
      hueShift: 130,
      angle: -90
    }
  }

  changeBase (val) {
    this.setState({ base: val }, this.updateUrl)
  }

  changeSaturate (e) {
    this.setState({ saturate: e.target.value }, this.updateUrl)
  }

  changeLighten (e) {
    this.setState({ lighten: e.target.value }, this.updateUrl)
  }

  changeHueShift (e) {
    this.setState({ hueShift: e.target.value }, this.updateUrl)
  }

  linearGradient (deg, from, to) {
    return 'linear-gradient(' + deg + 'deg, ' + from + ', ' + to + ')'
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      let params = window.location.search.replace(/^\?/, '')
      let obj = qs.parse(params)
      this.setState(obj)
    }
  }

  render () {

    let base = this.state.base
    let saturate = this.state.saturate
    let lighten = this.state.lighten
    let hueShift = this.state.hueShift
    let angle = this.state.angle

    let baseColor = Color(base)
    let from = baseColor.clone()
      .rotate(Number(this.state.hueShift))
      .saturate(this.state.saturate)
      .lighten(this.state.lighten)
      .hexString()
    let to = baseColor.clone()
      .rotate(-1 * Number(this.state.hueShift))
      .desaturate(this.state.saturate)
      .darken(this.state.lighten)
      .hexString()
    let gradient = this.linearGradient(angle, from, to)

    let light = baseColor.light()

    return (
      <div>
        <Background {...this.props} gradient={gradient} light={light}>
          <Header {...this.props} light={light} />
        </Background>
        <div className='md-flex'>
          <div className='md-col-6 lg-col-5 px2'>
            <BaseColor {...this.props}
              base={base}
              changeBase={this.changeBase}/>
          </div>
          <div className='flex-auto'></div>
          <form className='md-col-6 px2 py2'>
            <fieldset className='fieldset-reset no-select'>
              <legend className='h4 bold mb2'
                style={{ lineHeight: '2.25rem' }}>
                Gradient Spread
              </legend>
              <div className='sm-flex mxn2'>
                <div className='flex-auto px2'>
                  <label className='h5 bold block'>Hue Shift {hueShift}&deg;</label>
                  <input type='range' value={hueShift}
                    min='-180' max='180'
                    onBlur={this.changeHueShift}
                    onChange={this.changeHueShift}
                    className='col-12 dark-gray range-light' />
                </div>
                <div className='flex-auto px2'>
                  <label className='h5 bold block'>Saturate {saturate}</label>
                  <input type='range' value={saturate}
                    min='-1' max='1' step='0.01'
                    onBlur={this.changeSaturate}
                    onChange={this.changeSaturate}
                    className='col-12 dark-gray range-light' />
                </div>
                <div className='flex-auto px2'>
                  <label className='h5 bold block'>Lighten {lighten}</label>
                  <input type='range' value={lighten}
                    min='-1' max='1' step='0.01'
                    onBlur={this.changeLighten}
                    onChange={this.changeLighten}
                    className='col-12 dark-gray range-light' />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    )

  }

}

/*
*/


export default Gradient

