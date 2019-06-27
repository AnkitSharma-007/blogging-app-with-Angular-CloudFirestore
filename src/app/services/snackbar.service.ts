import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      panelClass: 'snackbar-ribon',
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
