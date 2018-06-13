import { ASSIGN_NOTES, ASSIGN_CODES } from '../constants/action-types';

export const assignNotes = notes => ({
  type: ASSIGN_NOTES,
  payload: notes,
});

export const assignCodes = codes => ({
  type: ASSIGN_CODES,
  payload: codes,
});