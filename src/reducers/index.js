import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import codeReducer from './codeReducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  notes: noteReducer,
  codes: codeReducer,
  loadingBar: loadingBarReducer,
});