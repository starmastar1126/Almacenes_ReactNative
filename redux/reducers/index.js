import {
  REG_USER_INFO,
  LOADING,
  SET_LOGOUT_BUTTON,
  ADD_SEARCHBAR,
} from '../actionTypes';
const initialState = {
  userinfo: {},
  logoutbutton: false,
  searchBar: false,
  loading: false,
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case REG_USER_INFO:
      return {...state, userinfo: action.payload};
    case SET_LOGOUT_BUTTON:
      return {...state, logoutbutton: action.payload};
    case ADD_SEARCHBAR:
      return {...state, searchBar: action.payload};
    case LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
export default rootReducer;
