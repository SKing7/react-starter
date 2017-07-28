import React from 'react'
import PropTypes from 'prop-types'

class DataProcessing extends React.Component {
    
    render()  {
      return (
        <div>
          {this.props.children}
        </div>
      )
    }
}
DataProcessing.propTypes = {
}

export default DataProcessing
