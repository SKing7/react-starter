import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import logo from './assets/logo.png'
import styles from './PageLayout.scss'

class PageLayout extends React.Component {

  returnToWeb() {
    document.location.href = '/Apps/html/index_new_v.html'
  }
  render() {
    return (
    <div className={`${styles.wrapper} h100`}>
      <header>
        <h1 className="header-nav">
          <img alt='' width="34" height="31" className='logo' src={logo} className="mr-15"/>
          数据预处理系统
        </h1>
        <nav>
          <span className="nav-item nav-item--return" onClick={this.returnToWeb}><i></i>返回主页面</span>
        </nav>
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
