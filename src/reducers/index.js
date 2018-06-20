import { combineReducers } from 'redux';
import noteReducer from './noteReducer';
import codeReducer from './codeReducer';
import patientReducer from './patientReducer';
import { loadingBarReducer } from 'react-redux-loading-bar';

export default combineReducers({
  notes: noteReducer,
  codes: codeReducer,
  patients: patientReducer,
  loadingBar: loadingBarReducer,
});