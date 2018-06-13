import { ASSIGN_NOTES } from '../constants/action-types';

const noteReducer = (state = [], action = {}) => {
  switch(action.type) {
    case ASSIGN_NOTES:
      return [...state, ...action.payload];
    default: return state;
  }
};

export default noteReducer;