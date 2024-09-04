import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../user.service';
import { addUser, addUserSuccess, addUserFailure, loadUsers, loadUsersSuccess, loadUsersFailure, updateUser, updateUserSuccess, updateUserFailure, deleteUser, deleteUserSuccess, deleteUserFailure } from './user.actions';
import { User } from '../user.model';

@Injectable()
export class UserEffects {
  
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  // Effect to load users
  loadUsers$ = createEffect(() => this.actions$.pipe(
    ofType(loadUsers),
    mergeMap(() => this.userService.getUsers().pipe(
      map((users: User[]) => loadUsersSuccess({ users })),
      catchError(error => of(loadUsersFailure({ error })))
    ))
  ));

  // Effect to add a user
  addUser$ = createEffect(() => this.actions$.pipe(
    ofType(addUser),
    mergeMap(action => this.userService.addUser(action.user).pipe(
      map((user: User) => addUserSuccess({ user })),
      catchError(error => of(addUserFailure({ error })))
    ))
  ));

  // Effect to update a user
  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(updateUser),
    mergeMap(action => this.userService.updateUser(action.user).pipe(
      map((user: User) => updateUserSuccess({ user })),
      catchError(error => of(updateUserFailure({ error })))
    ))
  ));

  // Effect to delete a user
  deleteUser$ = createEffect(() => this.actions$.pipe(
    ofType(deleteUser),
    mergeMap(action => this.userService.deleteUser(action.userId).pipe(
      map(() => deleteUserSuccess({ userId: action.userId })),
      catchError(error => of(deleteUserFailure({ error })))
    ))
  ));
}