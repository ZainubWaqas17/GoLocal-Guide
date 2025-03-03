// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, catchError, switchMap, tap } from 'rxjs';
// import { environment } from 'src/environments/environment';

// interface User {
//   password: string;
//   id: string;
//   name: string;
//   email: string;
//   token?: string; // Token is optional as it's not present during signup
// }

// interface AuthResponse {
//   user: User;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private currentUserSubject: BehaviorSubject<User | null>;
//   public currentUser$: Observable<User | null>;

//   constructor(private http: HttpClient) {
//     const storedUser = localStorage.getItem('currentUser');
//     this.currentUserSubject = new BehaviorSubject<User | null>(
//       storedUser ? JSON.parse(storedUser) : null
//     );
//     this.currentUser$ = this.currentUserSubject.asObservable();
//   }

//   private saveUserToStorage(user: User): void {
//     localStorage.setItem('currentUser', JSON.stringify(user));
//     this.currentUserSubject.next(user);
//   }

//   private removeUserFromStorage(): void {
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//   }

//   public get currentUserValue(): User | null {
//     return this.currentUserSubject.value;
//   }

//   // login(email: string, password: string): Observable<User> {
//   //   return this.http.get<User[]>(`${environment.apiBaseUrl}/users/login`)
//   //     .pipe(
//   //       map(users => {
//   //         const user = users.find(u => u.email === email && u.password === password);
//   //         if (user) {
//   //           this.saveUserToStorage(user);
//   //           return user;
//   //         } else {
//   //           throw new Error('Invalid login credentials');
//   //         }
//   //       }),
//   //       catchError(error => {
//   //         console.error('Login failed:', error);
//   //         throw error;
//   //       })
//   //     );
//   // }
//   login(email: string, password: string): Observable<User> {
//     // return this.http.get<User>(
//       // `${environment.apiBaseUrl}/users/login?email=${email}&password=${password}`
//       return this.http.post<User>(
//         `${environment.apiBaseUrl}/users/login`, 
//         { email, password } // ✅ Send credentials in body
//       )
      
//     .pipe(
//       tap(user => {
//         console.log('User logged in:', user); // Debugging
//         this.saveUserToStorage(user);
//       }),
//       catchError(error => {
//         console.error('Login failed:', error);
//         throw error;
//       })
//     );
//   }
  
  

//   signup(name: string, email: string, password: string): Observable<User> {
//     const newUser = { name, email, password };
//     // return this.http.post<User>(`${environment.apiBaseUrl}/users/login`, newUser).pipe(
//       return this.http.post<User>(`${environment.apiBaseUrl}/users/signup`, newUser).pipe(
//       switchMap(user => this.login(email, password)),
//       catchError(error => {
//         console.error('Signup failed:', error);
//         throw error;
//       })
//     );
//   }
//   // login(email: string, password: string): Observable<User> {
//   //   return this.http.post<User>(`${environment.apiBaseUrl}/users/login`, { email, password })
//   //     .pipe(
//   //       map(user => {
//   //         this.saveUserToStorage(user);
//   //         return user;
//   //       }),
//   //       catchError(error => {
//   //         console.error('Login failed:', error);
//   //         throw error;
//   //       })
//   //     );
//   // }
  
//   // signup(name: string, email: string, password: string): Observable<User> {
//   //   const newUser = { name, email, password };
//   //   return this.http.post<User>(`${environment.apiBaseUrl}/users/signup`, newUser)
//   //     .pipe(
//   //       switchMap(() => this.login(email, password)),
//   //       catchError(error => {
//   //         console.error('Signup failed:', error);
//   //         throw error;
//   //       })
//   //     );
//   // }
  

//   logout(): void {
//     this.removeUserFromStorage();
//   }

//   isLoggedIn(): boolean {
//     return !!this.currentUserValue;
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

interface User {
  password: string;
  id: string;
  name: string;
  email: string;
  token?: string;
}

interface AuthResponse {
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private apiUrl = `${environment.apiBaseUrl}/api/users`;

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  private removeUserFromStorage(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.user) {
            this.saveUserToStorage(response.user);
            return response.user;
          } else {
            throw new Error('Invalid response format');
          }
        }),
        catchError(error => {
          console.error('Login failed:', error);
          throw error;
        })
      );
  }

  signup(name: string, email: string, password: string): Observable<User> {
    const newUser = { name, email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, newUser)
      .pipe(
        map(response => {
          if (response.user) {
            this.saveUserToStorage(response.user);
            return response.user;
          } else {
            throw new Error('Invalid response format');
          }
        }),
        catchError(error => {
          console.error('Signup failed:', error);
          throw error;
        })
      );
  }

  logout(): void {
    this.removeUserFromStorage();
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }
}