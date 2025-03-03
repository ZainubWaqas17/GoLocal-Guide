import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = `${environment.apiBaseUrl}/login`; 

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    // Assuming we have the user's email stored in localStorage after login
    const userEmail = localStorage.getItem('userEmail');
    
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === userEmail) as User),
      catchError(error => {
        console.error('Error fetching user data', error);
        return of(null as unknown as User);
      })
    );
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    // In a real scenario, you'd send a PUT request to update the user
    // For this mock API, we'll just return the updated data
    return of({ ...userData } as User);
  }
}

