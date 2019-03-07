import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux'

import * as counterActions from './modules/counter'
import { TCombinedStates } from './modules';
import { Dispatch } from 'redux';

export interface ICounterActions {
  readonly increment: () => void
  readonly decrement: () => void
  readonly incrementAsync: () => void
  readonly decrementAsync: () => void
}

export interface IAppProps {
  readonly number: number
  readonly CounterActions: ICounterActions
}

class App extends Component<IAppProps> {
  render() {
    const { CounterActions, number } = this.props

    return (
      <div>
        <h1>{number}</h1>
        <button onClick={CounterActions.incrementAsync}>+</button>
        <button onClick={CounterActions.decrementAsync}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state: TCombinedStates) => ({ number: state.counter })
const mapDispatchToProps = (dispatch: Dispatch<counterActions.TCounterActions>) => ({
  CounterActions: {
    increment: () => dispatch(counterActions.increment()),
    decrement: () => dispatch(counterActions.decrement()),
    incrementAsync: () => {
      //1초 뒤 액션 디스패치
      setTimeout(
        () => { dispatch(counterActions.increment()) },
        1000
      );
    },
    decrementAsync: () => {
      //1초 뒤 액션 디스패치
      setTimeout(
        () => { dispatch(counterActions.decrement()) },
        1000
      );
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)