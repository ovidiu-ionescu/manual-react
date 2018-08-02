import { all, fork, take, takeEvery, call, put } from 'redux-saga/effects';
import * as actionTypes from './memo/memoActionTypes';
import * as api from './api';

function* workerFetchMemoList() {
  try {
    const { data } = yield call(api.fetchMemoList);
    yield put({
      type: actionTypes.FETCH_MEMO_LIST_SUCCEEDED,
      payload: { data },
      });
  } catch(e) {
    yield put({
      type: actionTypes.FETCH_MEMO_LIST_FAILED,
      payload: { error: e.message}
    });
  }
}

function* watchFetchMemoList() {
  console.log('watching for FETCH_MEMO_LIST');
    yield takeEvery(actionTypes.FETCH_MEMO_LIST, workerFetchMemoList);
}

function* workerFetchMemo(action) {
  console.log(`Fetch memo ${action.id}`);
  try {
    const { data } = yield call(api.fetchMemo, action.id);
    yield put({
      type: actionTypes.FETCH_MEMO_SUCCEEDED,
      payload: { data }
    });

  } catch(e) {
    yield put({
      type: actionTypes.FETCH_MEMO_FAILED,
      payload: { error: e.message }
    });
  }
}

function* watchFetchMemo() {
  console.log('watching for FETCH_MEMO');
  yield takeEvery(actionTypes.FETCH_MEMO, workerFetchMemo);
}


export default function* rootSaga() {
  console.log('rootSaga reporting for duty');
  yield fork(watchFetchMemoList);
  yield fork(watchFetchMemo);
}
