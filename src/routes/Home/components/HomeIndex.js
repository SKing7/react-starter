import { Col, Row, Grid, FormControl, Button, Checkbox, FormGroup, ControlLabel} from 'react-bootstrap';
import React from 'react'
import {findDOMNode} from 'react-dom'
import { findSelected } from '../../../util/dom';
import styles from './home.scss'
import FileSelector from '../../../components/FileSelector'
import HCheckbox from '../../../components/Checkbox'
import {Radio, RadioGroup} from '../../../components/RadioGroup'


class DataProcess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInputFileName: '',
      processFile: {}
    };
  }
  shouldComponentUpdate () {
    return true;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      processFile: nextProps.processFile
    });
  }
  handleUserInputFileNameChange(e) {
    this.setState({
      userInputFileName: e.target.value
    });
  }
  getFileValidationState() {
    if (!this._actived) {
      return 'success';
    }
    let fileNames = this.state.processFile.fileNames;
    return  (fileNames && fileNames.length > 0) ? 'success' : 'error';
  }
  checkFileName() {
    return /[\u4e00-\u9fa5a-zA-Z0-9]+/.test(this.state.userInputFileName) 
  }
  getNameValidationState() {
    if (!this._actived) {
      return 'success';
    }
    return this.checkFileName() ? 'success' : 'error' 
  }
  getErrorMsg(errorType) {
    let type = errorType;
    switch(type) {
      case 0: 
        return '';
      case 1: 
        return '请选择数据选项';
      case 2: 
        return '请填写文件名称';
    }
  }
  getErrorStatus() {
    let props = this.state;
    let selectedFiles = props.processFile.fileNames || [];
    let resultName = props.userInputFileName ;

    if (!this._actived) {
      return 0;
    }
    if (selectedFiles.length === 0) {
      return 1;
    }
    if (!this.checkFileName(resultName)) {
      return 2;
    }
    return 0;
  }
  openErrorCheck() {
    if (!this._actived) {
      this._actived = true;
      this.forceUpdate()
    }
  }
  selectProcessFile(params) {
    this.props.setSelectedProcessFile(params);
  }
  render () {
    let errorType = this.getErrorStatus();
    let { fetchList, submitProcessTask, data} = this.props;
    let submitFn = () => {

      let refs = this.refs;
      let ndDataSource = findSelected(refs.dataSource, 'dataSource')[0];
      let nlWave = findSelected(refs.waveCombine, 'waveCombine');
      let waveCombineValues = _.map(nlWave, (nd) => {
        return nd.value;
      })
      let selectedFiles = this.state.processFile;
      let params = {
        file_path: selectedFiles.filePath,
        file_names: selectedFiles.fileNames,
        data_source: ndDataSource.value,
        band_combine: waveCombineValues,
        result_name: this.state.userInputFileName,
      };

      this.openErrorCheck();
      if (!this.getErrorStatus()) {
        submitProcessTask(params, function () {
          this.props.router.push('/home/index');
        }.bind(this));
      }
    };

    return (
      <div className={styles.wrapper}>
        <div className="content-header">新建数据处理任务</div>
        <Grid>
          <div>
            <Row className="show-grid">
              <Col xs={4} md={2} className="mt-10">
                <label>选择数据：</label>
              </Col>
              <Col xs={9} md={10}>
                <FileSelector data={data} validationState={this.getFileValidationState()} fetchList={fetchList} setSelectedProcessFile={this.selectProcessFile.bind(this)}></FileSelector>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={3} md={2}>
                <label>数据源：</label>
              </Col>
              <Col xs={9} md={10}>
                <RadioGroup name="dataSource" selectedValue={this.state.dataSource} ref="dataSource">
                  <span className="radio-block">
                    <Radio value="landsat8" defaultChecked>Landsat8</Radio>
                  </span>
                  <span className="radio-block">
                    <Radio value="gaofen-2">高分2号</Radio>
                  </span>
                </RadioGroup>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={3} md={2}>
                <label>波段组合：</label>
              </Col>
              <Col xs={9} md={10}>
                <div ref="waveCombine">
                  <span className="radio-block">
                    <HCheckbox name="waveCombine" value="421" defaultChecked value="421" inline>421</HCheckbox>
                  </span>
                  <span className="radio-block">
                    <HCheckbox inline name="waveCombine" value="654">654</HCheckbox>
                  </span>
                  <span className="radio-block">
                    <HCheckbox inline name="waveCombine" value="432">432</HCheckbox>
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={3} md={2} className="mt-10">
                <label>重命名：</label>
              </Col>
              <Col xs={9} md={10}>
                <FormGroup validationState={this.getNameValidationState()}>
                  <FormControl type="text" placeholder="2017/05/05" className="file-process-input" value={this.state.userInputFileName} onChange={this.handleUserInputFileNameChange.bind(this)}/>
                  <ControlLabel className="mt-5">命名支持字母、汉字、数字组合，不支持特殊字符</ControlLabel>
                </FormGroup>
              </Col>
            </Row>
          </div>
          <p className="error-msg mt-20">{this.getErrorMsg(errorType)}</p>
          <div className="text-center mt-30">
              <Button onClick={submitFn}>下一步</Button>
          </div>
        </Grid>
      </div>
    );
  }
}

export default DataProcess
