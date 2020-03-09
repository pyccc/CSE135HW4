import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TableAndListsPage } from './table-and-lists.page';

const routes: Routes = [
  {
    path: '',
    component: TableAndListsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TableAndListsPage]
})
export class TableAndListsPageModule {}
