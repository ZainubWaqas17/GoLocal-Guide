import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  yearsOfExperience: number;
}

@Injectable({
  providedIn: 'root'
})
export class TeachersService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Mock API (Replace with actual API)

  constructor(private http: HttpClient) {}

  // 1. Get all teachers
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.apiUrl);
  }

  // 2. Add a new teacher
  addTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(this.apiUrl, teacher);
  }

  // 3. Delete a teacher by ID
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
