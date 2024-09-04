import { Action, createReducer, on } from '@ngrx/store';
import { loadUsersSuccess, loadUsersFailure, addUserSuccess, addUserFailure, updateUserSuccess, updateUserFailure, deleteUserSuccess, deleteUserFailure } from './user.actions';
import  {User} from '../user.model';

export interface UserState {
  users: User[];
  error: any;
}

export const initialState: UserState = {
  users: [],
  error: null
};

const _userReducer = createReducer(
  initialState, 
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    error: null
  })),
  on(addUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? user : u),
    error: null
  })),
  on(updateUserFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(u => u.id !== userId),
    error: null
  })),
  on(deleteUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return _userReducer(state, action);
}