
import React from 'react'
import Ad from './Ad.jsx'

class Background extends React.Component {

  render () {
    let style = {
      backgroundImage: this.props.gradient,
      minHeight: '80vh'
    }
    let preClass = 'h5 right-align m0 '
    preClass += this.props.light ? 'black' : 'white'

    return (
      <div style={style} className='flex flex-column'>
        <div className='p3'>
          {this.props.children}
        </div>
        <div className='flex-auto'></div>
        <div className='right-align'>
          <Ad light={this.props.light} />
        </div>
        <pre className={preClass}>background-image: {this.props.gradient};</pre>
      </div>
    )
  }

}

export default Background

