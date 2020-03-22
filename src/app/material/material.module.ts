import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule
  ],
  exports: [
    MatMenuModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class MaterialModule { }
