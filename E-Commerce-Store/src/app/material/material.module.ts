import { NgModule } from '@angular/core';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';

const materialComponents = [
  MatSidenavModule,
  MatGridListModule,
  MatMenuModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatExpansionModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatBadgeModule,
  MatSnackBarModule,
  MatFormFieldModule,
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
})
export class MaterialModule { }
