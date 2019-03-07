import { combineReducers } from 'redux'
import counter, { TCounterState } from './counter'

export type TCombinedStates = Readonly<{
  counter: TCounterState
}>

export default combineReducers<TCombinedStates>({
  counter
})