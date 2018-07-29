import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connect, Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

import memoReducer from './memo/memoReducer';

const fetchMemoList = () => ({type: 'FETCH_MEMO_LIST'});
const fetchMemo = (id) => ({type: 'FETCH_MEMO', 'id': id });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(memoReducer, {aha: 'aha'}, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

const mapStateToProps = state => ({ state });

const mapDispatchToProps = dispatch => ({
  fetchMemoList: () => dispatch(fetchMemoList())
});

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);


ReactDOM.render(

  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById("root")
);
