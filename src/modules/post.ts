import { createAction, ActionType, getType } from 'typesafe-actions'

import axios, { AxiosResponse, AxiosError, AxiosPromise } from 'axios';
import { Dispatch } from 'redux';

export interface IPostData {
  readonly title: string
  readonly body: string
}

function getPostAPI(postId: number) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const getPost = createAction(GET_POST, action => {
  return (postId: number) => action(getPostAPI(postId))
})
const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS, action => {
  return (response: AxiosResponse<IPostData>) => action(response)
});
const getPostFailure = createAction(GET_POST_FAILURE, action => {
  return (error: AxiosError) => action(error)
});

export type TPostActions = ActionType<typeof getPostPending | typeof getPostSuccess | typeof getPostFailure | typeof getPost>;

export interface IPostState {
  readonly pending: boolean,
  readonly error: boolean,
  readonly data: IPostData
}

const initialState: IPostState = {
  pending: false,
  error: false,
  data: {
    title: '',
    body: ''
  }
}

export default function handlePostActions(
  state: IPostState = initialState,
  action: TPostActions
): IPostState {
  switch (action.type) {
    case getType(getPostPending): {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case getType(getPostSuccess): {
      const { title, body } = action.payload.data;

      return {
        ...state,
        pending: false,
        data: {
          title,
          body
        }
      };
    }
    case getType(getPostFailure): {
      return {
        ...state,
        pending: false,
        error: true
      }
    }
    default:
      return state;
  }
}