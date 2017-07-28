import http from '../../../util/http';
import _ from 'lodash'

const FETCH_PROCESSING_FILE_LIST = 'fetchProcessingFileListAction';
// ------------------------------------
const initialState = {
  fileList: [],
};


const ACTION_HANDLERS = {
  [FETCH_PROCESSING_FILE_LIST]: (state, action) => {
    return _.assign({}, state, {fileList: action.payload.file_list});
  },
}

// 数据监测
export const fetchList = (params) => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      http.post('/api/file_list',  params)
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


export default function dataProcessingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ?  handler(state, action) : state
}
