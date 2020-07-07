import { CustomerReactiveFormComponent } from './customer-reactive-form/customer-reactive-form.component';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerFormComponent } from './customer-form/customer-form.component';

const routes: Routes = [
  { path: '', component: CustomerShellComponent },
  { path: 'edit', component: CustomerFormComponent },
  { path: 'reactiveEdit', component: CustomerReactiveFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
