import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudopComponent } from './crudop/crudop.component';

const routes: Routes = [
  {
    path:'crudop', component: CrudopComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
