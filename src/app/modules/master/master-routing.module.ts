import { ScopeComponent } from './../../components/Masters/scope/scope.component';
import { UsersComponent } from './../../components/Masters/users/users.component';
import { CustomersComponent } from './../../components/Masters/customers/customers.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'Customers', component: CustomersComponent },
  { path: 'Scope', component: ScopeComponent },
  { path: 'Users', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
