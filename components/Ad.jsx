
import React from 'react'

class Ad extends React.Component {

  render () {
    var className = 'inline-block ' + (this.props.light ? 'black' : 'white')
    return (
      <div className={className}>
        <script async
          type='text/javascript'
          src='//cdn.carbonads.com/carbon.js?zoneid=1696&serve=CVYD42T&placement=jxnblkcom' id='_carbonads_js' />
      </div>
    )
  }

}

export default Ad

