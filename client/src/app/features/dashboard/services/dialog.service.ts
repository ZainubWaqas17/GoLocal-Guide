import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LoginPromptComponent } from '../components/login-prompt/login-prompt.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  showLoginPrompt(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(LoginPromptComponent, {
      width: '400px', 
      maxWidth: '90vw', 
      panelClass: 'login-dialog', 
      autoFocus: false, 
      disableClose: true, 
      data: { message }
    });

    return dialogRef.afterClosed();
  }
}