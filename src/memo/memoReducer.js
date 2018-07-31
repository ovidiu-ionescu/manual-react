import * as actionTypes from './memoActionTypes';

export default (state, action) => {
  switch(action.type) {
    case actionTypes.FETCH_MEMO_LIST_SUCCEEDED: {
      return {
        ...state, 
        memoList: action.payload.data.memos
      };
    }
    
    case actionTypes.FETCH_MEMO_SUCCEEDED: {
      const memo = action.payload.data.memo;
      const memos = { ...state.memos}
      memos[memo.id.toString()] = memo;
      return {
        ...state,
        memos
      }
    }
  }
  return state;
} 