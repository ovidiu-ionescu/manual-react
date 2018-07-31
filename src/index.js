import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import Memo from './memo/Memo.js';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import memoReducer from './memo/memoReducer';

const fetchMemoList = () => ({type: 'FETCH_MEMO_LIST'});
const fetchMemo = (id) => ({type: 'FETCH_MEMO', 'id': id });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(memoReducer, {memoList:[], memos: {}}, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const mapStateToProps = state => ({ state });


// add some action factories to the props so they are easier to invoke
const mapDispatchToProps = dispatch => ({
  fetchMemoList: () => dispatch(fetchMemoList()),
  fetchMemo: (id) => dispatch(fetchMemo(id))
});

// make a new component decorating the existing one
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(Memo);


ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
