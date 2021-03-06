import { createAction, ActionType, getType } from 'typesafe-actions'

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

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