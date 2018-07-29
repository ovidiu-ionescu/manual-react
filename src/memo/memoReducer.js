import * as actionTypes from './memoActionTypes';

export default (state, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MEMO_LIST_SUCCEEDED: {
      console.log({action});
      return {
        ...state, 
        memoTitles: action.payload.data.memos 
      };
    }
  }
  return state;
} 