import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomerShellComponent } from './customer-shell/customer-shell.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerReactiveFormComponent } from './customer-reactive-form/customer-reactive-form.component';

@NgModule({
  declarations: [CustomerShellComponent, CustomerFormComponent, CustomerReactiveFormComponent],
  imports: [SharedModule, CustomersRoutingModule],
})
export class CustomersModule {}
