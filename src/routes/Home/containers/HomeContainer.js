import { connect } from 'react-redux'
import React from 'react'
import DataProcess from '../components/HomeIndex'
import { fetchList } from '../modules/home'


const mapStateToProps = (state) => {
  return { 
    data: state.home.fileList,
  }
}

const mapDispatchToProps = {
  fetchList,
};


export default connect(mapStateToProps, mapDispatchToProps)(DataProcess)
