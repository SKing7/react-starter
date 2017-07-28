import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import logo from './assets/logo.png'
import styles from './PageLayout.scss'

class PageLayout extends React.Component {

  render() {
    return (
    <div className={`${styles.wrapper} h100`}>
      <header>
        <h1 className="header-nav">
          DEMO
        </h1>
      </header>
      <div className="content-wrapper">
        <ul className='left-nav'>
          <li className="process-nav">
            <Link to='/home/' activeClassName='active'>首页</Link>
          </li>
        </ul>
        <div className='content-container'>
          <div className='page-layout__viewport'>
            {this.props.children}
          </div>
        </div>
      </div>
    </div>);
  }
}
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
