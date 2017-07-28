import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'
//import './base.scss' 
import { ControlLabel, Radio, Modal, Button, Table, FormControl, Checkbox, FormGroup} from 'react-bootstrap';
import { find  } from '../../util/dom';
import { normalizePath } from '../../util/base';


class FileSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedFilesText: '',
      stack: [],
      stackPath: '/',
      show: false,
      data: []
    };
  }

  static propTypes = {
  }

  shouldComponentUpdate () {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({
        data: nextProps.data
      });
    }
  }

  render () {
    let { data, stack } = this.state;;
    let close = () => {
      this.setState({
        show: false,
        stack: [],
        stackPath: '/',
      });
    }
    let show = () => {
      this.setState({show: true})
      this.props.fetchList();
    };

    let getSelectedFiles = () => {
      let nl = find(this.refs.wrapper, '[name="selectedFile"]', (n) => {
        return n.checked === true;
      })
      let values = _.map(nl, (nd) => {
        return nd.value;
      })
      return values;

    };


    let selectFile = () => {
      let values = getSelectedFiles();
      this.props.setSelectedProcessFile({
        filePath: this.state.stackPath,
        fileNames: values
      });
      this.setState({
        selectedFilesText: getSelectedFilesFullPath()
      });
      close();
    };

    let getSelectedFilesFullPath = () => {
      let stackPathStr = getSelectedFilesDirPath();
      let names = getSelectedFiles();
      return _.map(names, (name) => {
        return normalizePath(stackPathStr + '/' + name);
      });
    };

    let getSelectedFilesDirPath = () => {
      var stackPathArr = [];
      stackPathArr = _.map(stack, (v) => {
        return v.name;
      });
      stackPathArr.unshift('/');
      return normalizePath(stackPathArr.join('/'));
    };

    let step = () => {
      let ndSelectAllBtn = find(this.refs.selectAllBtn, 'input[type="checkbox"]')[0];
      let stackPath = getSelectedFilesDirPath();

      ndSelectAllBtn.checked = false;
      this.props.fetchList({
        file_dir: stackPath
      })
      this.setState({
        stackPath: stackPath
      });
    }; 

    let returnBack = () => {
      stack.pop();
      step();
    };

    let selectAll = (e) => {
      let isAllChecked = e.target.checked;
      let nl = find(this.refs.wrapper, '[name="selectedFile"]');
      _.forEach(nl, (item) => {
        if (!/\/$/.test(item.value)) {
          item.checked = isAllChecked;
        }
      })
    };

    let goIn = (dir) => {
      stack.push(dir);
      step();
    };

    let updateSelectAllBtnStatus = (e) => {
      let ndSelectAllBtn = find(this.refs.selectAllBtn, 'input[type="checkbox"]')[0];
      if (!e.target.checked) {
        ndSelectAllBtn.checked = false;
      }
    };


    function FieldGroup({ id, label, help, ...props }) {
      return (
          <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
          </FormGroup>
          );
    }

    return (
        <div>
          <FormGroup validationState={this.props.validationState}>
            <FormControl type="text" placeholder="点击选择要处理的数据"
              className="form-controller file-process-input file-process-input"
              onClick={show.bind(this)} value={this.state.selectedFilesText}/>
            <ControlLabel className="mt-5">支持zip或rar数据压缩包，压缩包内文件支持.tiff  .img 格式数据的处理</ControlLabel>
          </FormGroup>
          <Modal show={this.state.show} onHide={close} bsSize="large" aria-labelledby="contained-modal-title-lg" className="file-select-modal">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">文件上传</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>数据目录</h4>
                <div className="file-nav mb-10">
                  <a className="mr-10" href="javascript:;" onClick={returnBack}>返回上级</a>
                  <span>{this.state.stackPath}</span>
                </div>
                <Table responsive>
                  <thead>
                    <tr>
                      <th><Checkbox onChange={selectAll} ref="selectAllBtn" inline></Checkbox>名称</th>
                      <th width="30%">最后修改</th>
                      <th width="20%">大小</th>
                    </tr>
                  </thead>
                  <tbody ref="wrapper">
                  {
                    data.map(item => {
                      let props = {};
                      let checkBox;
                      if (item.type === 'dir') {
                        props.onChange = goIn.bind(this, item);
                      } else {
                        props.onChange = updateSelectAllBtnStatus.bind(this);
                      }
                      return (
                        <tr  key={item.name}>
                          <td><Checkbox value={item.name} name="selectedFile" {...props}>{item.name}</Checkbox></td>
                          <td>{item.time}</td>
                          <td>{item.size}</td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
              <div className="text-center">
                  <Button onClick={selectFile}>确定</Button>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
    )
  }
}

export default FileSelector;
