import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { GET_FRIENDS_LIST } from "../redux/actionTypes/index";
import store from "../redux/index";

import friendsListService from "./service";

function* getFriendsList(action) {
  const { text } = store.getState().text;

  const param = {
    ...{ condition: text },
    ...action.param
  };
  try {
    let result = yield call(friendsListService.listFriend, param);
    if (result) {
      yield put({
        type: GET_FRIENDS_LIST.GET_FRIENDS_LIST_SUCCESS,
        friendsList: result
      });
    }
  } catch (e) {
  }
}
export default function* rootSaga() {
  yield takeEvery(GET_FRIENDS_LIST.GET_FRIENDS_LIST, getFriendsList);
}
