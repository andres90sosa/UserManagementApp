import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { loadUsers, deleteUser } from '../store/user.actions';
import { selectAllUsers } from '../store/user.selectors';
import { Router } from '@angular/router';
import  {User} from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  displayedColumns: string[] = ['id', 'name', 'email', 'actions', 'add'];

  constructor(private store: Store, private router: Router) 
  { 
    this.users = this.store.select(selectAllUsers).pipe(
      map(users => users ?? []), // Asegura que nunca sea null
      catchError(() => of([])) // Si hay un error, retorna un array vacío
    );
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.store.dispatch(loadUsers());
  }

  onAddUser(): void {
    this.router.navigate(['/users/create']);
  }

  onEditUser(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }

  onDeleteUser(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.store.dispatch(deleteUser({ userId: id }));
    }
  }
}
