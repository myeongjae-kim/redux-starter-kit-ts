import { combineReducers } from 'redux'
import counter, { TCounterState } from './counter'
import post, { IPostState } from './post'

export type TCombinedStates = Readonly<{
  counter: TCounterState
  post: IPostState
}>

export default combineReducers<TCombinedStates>({
  counter,
  post
})