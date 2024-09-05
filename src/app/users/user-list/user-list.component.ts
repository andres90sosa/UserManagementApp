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
  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions', 'add'];
  filteredUsers: User[] = [];
  filterText: string = '';

  constructor(private store: Store, private router: Router) 
  { }

  ngOnInit(): void {
    this.store.select(selectAllUsers).subscribe(users => {
      this.users = users;
      this.filteredUsers = users; // Inicializa la lista filtrada con todos los usuarios
    });

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

  onFilterChange(): void {
    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.filterText.toLowerCase()));
  }
}
