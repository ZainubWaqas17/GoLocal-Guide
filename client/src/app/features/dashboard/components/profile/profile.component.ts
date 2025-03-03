import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup;
    loading = false;
    submitted = false;
    profileImageUrl: string = 'https://via.placeholder.com/100';
    currentUser: User | null = null;
  
    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService
    ) {
      this.initForm();
    }
  
    ngOnInit() {
      this.loadUserData();
    }
  
    private initForm(): void {
      this.profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
    }
  
    private loadUserData(): void {
      this.userService.getCurrentUser().subscribe(
        (user) => {
          if (user) {
            this.currentUser = user;
            this.profileForm.patchValue({
              name: user.name,
              email: user.email
            });
            // You could set a default avatar based on the user's name if no image is available
            this.profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;
          }
        },
        (error) => {
          console.error('Error loading user data', error);
          // Handle error (show message to user)
        }
      );
    }
  
    get f() {
      return this.profileForm.controls;
    }
  
    onSubmit() {
      this.submitted = true;
  
      if (this.profileForm.invalid) {
        return;
      }
  
      this.loading = true;
      
      const updatedUser: Partial<User> = {
        ...this.currentUser,
        ...this.profileForm.value
      };
  
      this.userService.updateProfile(updatedUser).subscribe(
        (response) => {
          this.loading = false;
          console.log('Profile updated successfully', response);
          // Handle success (show success message)
        },
        (error) => {
          this.loading = false;
          console.error('Error updating profile', error);
          // Handle error (show error message)
        }
      );
    }
  
    onEditAvatar() {
      // Implement avatar edit functionality
      console.log('Edit avatar clicked');
    }
  }

