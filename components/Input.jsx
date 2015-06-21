// Currently unused

import React from 'react'

class Input extends React.Component {

  render () {
    return (
      <div>
        <label>
        </label>
        <input
          type="text"
          className="mb0 field-light"
          onBlur={this.props.onBlur}
          valueLink={this.props.valueLink} />
      </div>
    )
  }

}

export default Input

