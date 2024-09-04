import { createAction, props } from '@ngrx/store';
import  {User} from '../user.model';

export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction('[User List] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User List] Load Users Failure', props<{ error: any }>());

export const addUser = createAction('[User Form] Add User', props<{ user: User }>());
export const addUserSuccess = createAction('[User Form] Add User Success', props<{ user: User }>());
export const addUserFailure = createAction('[User Form] Add User Failure', props<{ error: any }>());

export const updateUser = createAction('[User Form] Update User', props<{ user: User }>());
export const updateUserSuccess = createAction('[User Form] Update User Success', props<{ user: User }>());
export const updateUserFailure = createAction('[User Form] Update User Failure', props<{ error: any }>());

export const deleteUser = createAction('[User List] Delete User', props<{ userId: number }>());
export const deleteUserSuccess = createAction('[User List] Delete User Success', props<{ userId: number }>());
export const deleteUserFailure = createAction('[User List] Delete User Failure', props<{ error: any }>());