import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.services';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoading = false;
  error: string | null = null;
  success: string | null = null;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Tourist', Validators.required],
    });
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  // onSubmit(): void {
  //   if (this.signupForm.valid) {
  //     this.isLoading = true;
  //     this.error = null;

  //     this.authService
  //       .signup(
  //         this.signupForm.value.name,
  //         this.signupForm.value.email,
  //         this.signupForm.value.password
  //       )
  //       .subscribe({
  //         next: () => {
  //           this.success = 'Account created successfully!';
  //           setTimeout(() => this.router.navigate(['/dashboard']), 2000);
  //         },
  //         error: (err) => {
  //           this.error = err.message || 'Failed to create account';
  //           this.isLoading = false;
  //         },
  //       });
  //   }
  // }
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isLoading = true;
      this.error = null;

      const { name, email, password } = this.signupForm.value;

      this.authService.signup(name, email, password).subscribe({
        next: (user) => {
          this.success = 'Account created successfully!';
          setTimeout(() => this.router.navigate(['/dashboard']), 2000);
        },
        error: (err: any) => {
          this.error = err.message || 'Failed to create account';
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.error = 'Please fill in all required fields correctly.';
    }
  }
}
