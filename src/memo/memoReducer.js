import * as actionTypes from './memoActionTypes';

export default (state, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MEMO_LIST_SUCCEEDED:
    console.log('Fetch memo list');
    return state;
  }
} 