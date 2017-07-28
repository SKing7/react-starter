import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './base.scss' 
import { Radio, Checkbox } from 'react-bootstrap';


class HCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
  }

  shouldComponentUpdate () {
    return true;
  }

  render () {
    const {children, ...rest} = this.props;
    return (
      <span className={styles.wrapper}>
        <Checkbox {...rest}>
          <i></i>
          {this.props.children}
        </Checkbox>
      </span>
    )
  }
}

export default HCheckbox;
