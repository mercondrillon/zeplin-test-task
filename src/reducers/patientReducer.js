import { ASSIGN_PATIENTS } from '../constants/action-types';

const patientReducer = (state = [], action = {}) => {
  switch(action.type) {
    case ASSIGN_PATIENTS:
      return [...state, ...action.payload];
    default: return state;
  }
};

export default patientReducer;