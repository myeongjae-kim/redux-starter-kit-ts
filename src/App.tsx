import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux'

import * as counterActions from './modules/counter'
import { TCombinedStates } from './modules';
import { Dispatch, bindActionCreators } from 'redux';

export interface IAppProps {
  readonly number: number
  readonly CounterActions: typeof counterActions
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
  CounterActions: bindActionCreators(counterActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)