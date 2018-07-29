import { fork, take, call, put } from 'redux-saga/effects';
import * as actionTypes from './memo/memoActionTypes';
import * as api from './api';

export default function* rootSaga() {
  console.log('rootSaga reporting for duty');
  yield fork(watchFetchMemoList);
}

function* watchFetchMemoList() {
  console.log('watching!');
  while(true) {
    yield take(actionTypes.FETCH_MEMO_LIST);
    try {
      const { data } = yield call(api.fetchMemoList);
      yield put({
        type: actionTypes.FETCH_MEMO_LIST_SUCCEEDED,
        payload: { tasks: data },
        });
    } catch(e) {
      yield put({
        type: actionTypes.FETCH_MEMO_LIST_FAILED,
        payload: { error: e.message}
      });
    }
  }
}