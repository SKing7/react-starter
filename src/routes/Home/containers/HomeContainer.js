import { connect } from 'react-redux'
import React from 'react'
import DataProcess from '../components/HomeIndex'
import { fetchList, changeInputName, submitProcessTask, setSelectedProcessFile } from '../modules/home'


const mapStateToProps = (state) => {
  return { 
    data: state.home.fileList,
    processFile: state.home.processFile,
    userInputFileName: state.home.userInputFileName
  }
}

const mapDispatchToProps = {
  fetchList,
  submitProcessTask,
  changeInputName,
  setSelectedProcessFile

};


export default connect(mapStateToProps, mapDispatchToProps)(DataProcess)
