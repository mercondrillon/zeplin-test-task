import { ASSIGN_CODES } from '../constants/action-types';

const codeReducer = (state = [], action = {}) => {
  switch(action.type) {
    case ASSIGN_CODES:
      return [...state, ...action.payload];
    default: return state;
  }
};

export default codeReducer;