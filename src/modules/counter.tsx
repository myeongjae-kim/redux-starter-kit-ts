import { createAction, ActionType, getType } from 'typesafe-actions'

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT, action => {
  return (state: TCounterState) => action(state)
});
export const decrement = createAction(DECREMENT, action => {
  return (state: TCounterState) => action(state)
});

export type TCounterState = number;
export type TCounterActions = ActionType<typeof increment | typeof decrement>

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