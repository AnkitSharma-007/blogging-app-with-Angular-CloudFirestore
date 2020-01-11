import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatInputModule, MatIconModule,
  MatDividerModule, MatProgressSpinnerModule, MatToolbarModule,
  MatSelectModule, MatMenuModule, MatSnackBarModule, MatTooltipModule,
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ]
})
export class NgMaterialModule { }
