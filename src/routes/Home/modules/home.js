import http from '../../../util/http';
import _ from 'lodash'

const FETCH_PROCESSING_FILE_LIST = 'fetchProcessingFileListAction';
const SELECT_PROCESS_FILE = 'selectProcessFile';
// ------------------------------------
const initialState = {
  fileList: [],
  processFile: '',
  // object  react-route 会检测值的变化
  progressInfo: { 
    value: 0,
    type: 'check'
  },
};


const ACTION_HANDLERS = {
  [FETCH_PROCESSING_FILE_LIST]: (state, action) => {
    return _.assign({}, state, {fileList: action.payload.file_list});
  },
  [SELECT_PROCESS_FILE]: (state, action) => {
    return _.assign({}, state, { processFile: action.payload });
  },
}

export const fetchList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      http.post('/image_processing/file_list', _.assign({ file_dir: '/'}, params))
      .then(function (res) {
        dispatch({
          type: FETCH_PROCESSING_FILE_LIST,
          payload: res.data
        })
        resolve()
      })
      .catch(function (error) {
        console.log(error);
      });
    })
  }
};

export const setSelectedProcessFile = (obj) => {
  return (dispatch, getState) => {
    dispatch({
      type: SELECT_PROCESS_FILE,
      payload: obj
    });
  }
};


// 数据监测


export default function dataProcessingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ?  handler(state, action) : state
}
