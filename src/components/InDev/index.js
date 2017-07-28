
import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styles from './base.scss' 
import img from './assets/in-dev.png'


class InDev extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <div className={`${styles.wrapper} text-center`}>
          <img src={img} width="400" height="300"/>
          <p>工程师正在马不停蹄的开发，敬请等待....</p>
        </div>
    );
  }
}

export default InDev;
