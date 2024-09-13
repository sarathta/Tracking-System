import { ScopeComponent } from './../../components/Masters/scope/scope.component';
import { UsersComponent } from './../../components/Masters/users/users.component';
import { SharedModule } from './../shared/shared.module';
import { CustomersComponent } from './../../components/Masters/customers/customers.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';


@NgModule({
  declarations: [
    CustomersComponent,
    ScopeComponent,
    UsersComponent
  ],
  imports: [
    SharedModule,
    MasterRoutingModule
  ]
})
export class MasterModule { }
