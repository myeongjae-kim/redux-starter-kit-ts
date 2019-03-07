import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux'

import * as counterActions from './modules/counter'
import { TCombinedStates } from './modules';
import { Dispatch } from 'redux';

export interface ICounterActions {
  readonly increment: () => void
  readonly decrement: () => void
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
        <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state: TCombinedStates) => ({ number: state.counter })
const mapDispatchToProps = (dispatch: Dispatch<counterActions.TCounterActions>) => ({
  CounterActions: {
    increment: () => dispatch(counterActions.increment()),
    decrement: () => dispatch(counterActions.decrement())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)