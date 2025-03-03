import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher, TeachersService } from '../services/teachers.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit, OnDestroy {
  teachers: Teacher[] = [];
  newTeacher: Teacher = { id: 0, name: '', subject: '', yearsOfExperience: 0 };
  private subscriptions: Subscription = new Subscription(); // Subscription handler

  constructor(private teachersService: TeachersService) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  // Load teachers and store the subscription
  loadTeachers(): void {
    const sub = this.teachersService.getTeachers().subscribe(
      (data) => this.teachers = data,
      (error) => console.error('Error fetching teachers:', error)
    );
    this.subscriptions.add(sub);
  }

  // Add a new teacher
  addTeacher(): void {
    if (!this.newTeacher.name || !this.newTeacher.subject || this.newTeacher.yearsOfExperience <= 0) {
      alert('Please fill in all details.');
      return;
    }

    const sub = this.teachersService.addTeacher(this.newTeacher).subscribe(
      (teacher) => {
        this.teachers.push(teacher);
        this.newTeacher = { id: 0, name: '', subject: '', yearsOfExperience: 0 };
      },
      (error) => console.error('Error adding teacher:', error)
    );
    this.subscriptions.add(sub);
  }

  // Delete a teacher
  deleteTeacher(id: number): void {
    const sub = this.teachersService.deleteTeacher(id).subscribe(
      () => {
        this.teachers = this.teachers.filter(t => t.id !== id);
      },
      (error) => console.error('Error deleting teacher:', error)
    );
    this.subscriptions.add(sub);
  }

  // Cleanup all subscriptions when the component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    console.log('TeachersComponent destroyed and subscriptions cleaned.');
  }
}
