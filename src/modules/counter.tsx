import { createAction, ActionType, getType } from 'typesafe-actions'
import { Dispatch, AnyAction } from 'redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export type TCounterState = number;

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

export type TCounterActions = ActionType<typeof increment | typeof decrement>

export const incrementAsync = () => (dispatch: Dispatch<TCounterActions>) => {
  // 1초 뒤 액션 디스패치
  setTimeout(
    () => { dispatch(increment()) },
    1000
  )
}

export const decrementAsync = () => (dispatch: Dispatch<TCounterActions>) => {
  // 1초 뒤 액션 디스패치
  setTimeout(
    () => { dispatch(decrement()) },
    1000
  )
}

const initialState: TCounterState = 0

export default function handleActions(state: TCounterState = initialState, action: TCounterActions): TCounterState {
  switch (action.type) {
    case getType(increment): {
      return state + 1;
    }
    case getType(decrement): {
      return state - 1;
    }
    default:
      return state;
  }
}