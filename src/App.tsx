import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux'

import * as counterActions from './modules/counter'
import { TCombinedStates } from './modules';
import { Dispatch } from 'redux';

export interface ICounterActions {
  readonly increment: (number: number) => void
  readonly decrement: (number: number) => void
}

export interface IAppProps {
  readonly number: number
  readonly CounterActions: ICounterActions
}

class App extends Component<IAppProps> {
  render() {
    const { CounterActions, number } = this.props

    const handleIncrement = (e: SyntheticEvent) => {
      CounterActions.increment(number);
    }

    const handleDecrement = (e: SyntheticEvent) => {
      CounterActions.decrement(number)
    }

    return (
      <div>
        <h1>{number}</h1>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state: TCombinedStates) => ({ number: state.counter })
const mapDispatchToProps = (dispatch: Dispatch<counterActions.TCounterActions>) => ({
  CounterActions: {
    increment: (number: number) => dispatch(counterActions.increment(number)),
    decrement: (number: number) => dispatch(counterActions.decrement(number))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)