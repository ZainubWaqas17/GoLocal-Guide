import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-prompt',
  templateUrl: 'login-prompt.component.html',
  styleUrls: ['login-prompt.component.css']
})
export class LoginPromptComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}