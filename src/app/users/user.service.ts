import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';
   
  // Datos de usuarios simulados
   private simulatedUsers: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com' },
    { id: 2, name: 'Ana García', email: 'ana.garcia@example.com' },
    { id: 3, name: 'Luis Fernández', email: 'luis.fernandez@example.com' }
  ];
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return of([...this.simulatedUsers]); // Devolver una copia del array
    // return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User|undefined> {
    return of(this.simulatedUsers.find(u => u.id === id));
    // return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  addUser(user: User): Observable<User> {
   // Asegurarse de que no haya usuarios con el mismo ID
   const exists = this.simulatedUsers.some(u => u.id === user.id);
   if (!exists) {
     this.simulatedUsers = [...this.simulatedUsers, user]; // Crear una nueva instancia del array
   }
   return of(user); // Devuelve el usuario agregado como Observable
    // return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
    const index = this.simulatedUsers.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.simulatedUsers = [
        ...this.simulatedUsers.slice(0, index),
        user,
        ...this.simulatedUsers.slice(index + 1)
      ]; // Crear una nueva instancia del array con el usuario actualizado
    }
    return of(user); // Devuelve el usuario actualizado como Observable
    // return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(id: number): Observable<number> {
    this.simulatedUsers = this.simulatedUsers.filter(u => u.id !== id);
    return of(id); // Devuelve un Observable vacío
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
