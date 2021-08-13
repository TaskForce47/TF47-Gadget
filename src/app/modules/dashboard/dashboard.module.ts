import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { DashboardEventsComponent } from './dashboard-events/dashboard-events.component';
import { DashboardPlayerComponent } from './dashboard-player/dashboard-player.component';
import { DashboardTicketComponent } from './dashboard-ticket/dashboard-ticket.component';
import { DashboardInfoComponent } from './dashboard-info/dashboard-info.component';
import { DashboardModsComponent } from './dashboard-mods/dashboard-mods.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: {
			breadcrumb: 'Dashboard',
		},
	},
  {
		path: 'login',
		component: LoginComponent,
		data: {
			breadcrumb: 'Login',
		},
	},
];

@NgModule({
	declarations: [
		HomeComponent,
		DashboardEventsComponent,
		DashboardPlayerComponent,
		DashboardTicketComponent,
		DashboardInfoComponent,
		DashboardModsComponent,
    LoginComponent,
	],
	imports: [CommonModule, UiModule, UiComponentsModule, RouterModule.forChild(routes)],
	exports: [RouterModule, DashboardInfoComponent],
})
export class DashboardModule {}
