import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { ServerModsComponent } from './server-mods/server-mods.component';
import { ServerConfigurationComponent } from './server-configuration/server-configuration.component';
import { ServerOverviewComponent } from './server-overview/server-overview.component';
import { ServerProfileComponent } from './server-profile/server-profile.component';
import { ServerComponent } from './server/server.component';

const routes: Routes = [
	{
		path: '',
		component: ServerOverviewComponent,
		data: {
			breadcrumb: 'Overview',
		},
	},
	{
		path: '/:id',
		component: ServerComponent,
		children: [
			{
				path: '/profile',
				component: ServerProfileComponent,
			},
		],
	},
];
@NgModule({
	declarations: [
		ServerOverviewComponent,
		ServerProfileComponent,
		ServerComponent,
		ServerModsComponent,
		ServerConfigurationComponent,
	],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServercontrolModule {}
