import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux'

import * as counterActions from './modules/counter'
import * as postActions from './modules/post'
import { TCombinedStates } from './modules';
import { Dispatch, bindActionCreators } from 'redux';

import { IPostData } from './modules/post';

export interface IAppProps {
  readonly number: number
  readonly post: IPostData
  readonly loading: boolean
  readonly error: boolean
  readonly CounterActions: typeof counterActions
  readonly PostActions: typeof postActions
}

class App extends Component<IAppProps> {
  loadData = () => {
    const { PostActions, number } = this.props;
    PostActions.getPost(number);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps: IAppProps) {
    // 이전 number와 현재 number가 다르면 요청을 시작합니다.
    if (this.props.number !== prevProps.number) {
      this.loadData();
    }
  }

  render() {
    const { CounterActions, number, post, error, loading } = this.props

    return (
      <div>
        <h1>{number}</h1>
        {
          loading
            ? (<h2>로딩중... </h2>)
            : (
              error
                ? (<h2>오류 발생!</h2>)
                : (
                  <div>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                  </div>
                )
            )
        }

        <button onClick={CounterActions.increment}>+</button>
        <button onClick={CounterActions.decrement}>-</button>
      </div>
    );
  }
}

const mapStateToProps = (state: TCombinedStates) => ({
  number: state.counter,
  post: state.post.data,
  loading: state.post.pending,
  error: state.post.error
})
const mapDispatchToProps = (dispatch: Dispatch<counterActions.TCounterActions | postActions.TPostActions>) => ({
  CounterActions: bindActionCreators(counterActions, dispatch),
  PostActions: bindActionCreators(postActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)