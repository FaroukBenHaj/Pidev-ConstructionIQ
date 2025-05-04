import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardSecurityComponent } from './dashboard-security.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DashboardSecurityComponent }
	])],
	exports: [RouterModule]
})
export class DashboardSecurityRoutingModule { }
