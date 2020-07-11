import {
  REG_USER_INFO,
  SET_LOGOUT_BUTTON,
  ADD_SEARCHBAR,
  LOADING,
} from '../actionTypes/index';
export function regUserInfo(payload) {
  return {type: REG_USER_INFO, payload};
}
export function setLogOut(payload) {
  return {type: SET_LOGOUT_BUTTON, payload};
}
export function addSearchBar(payload) {
  return {type: ADD_SEARCHBAR, payload};
}

export function setLoading(payload) {
  return {type: LOADING, payload};
}
