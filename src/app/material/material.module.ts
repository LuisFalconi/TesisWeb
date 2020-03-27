import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule, MatPaginatorModule, MatSortModule, MatSnackBarModule, MatSidenavModule, MatDivider, MatDividerModule, MatToolbarModule} from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatToolbarModule

  ]
})
export class MaterialModule { }
