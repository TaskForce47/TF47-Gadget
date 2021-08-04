import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { ServerModsComponent } from './servers/server-mods/server-mods.component';
import { ServerConfigurationComponent } from './servers/server-configuration/server-configuration.component';
import { ServerOverviewComponent } from './servers/server-overview/server-overview.component';
import { ServerProfileComponent } from './servers/server-profile/server-profile.component';
import { ServerComponent } from './servers/server/server.component';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { ServercontrolMenuComponent } from './servercontrol-menu/servercontrol-menu.component';

const routes: Routes = [
	{
		path: '',
		component: ServercontrolMenuComponent,
	},
	{
		path: 'server',
		redirectTo: 'server/overview',
		pathMatch: 'full',
	},
	{
		path: 'server/overview',
		component: ServerOverviewComponent,
	},
	{
		path: 'server/:id',
		component: ServerComponent,
		children: [
			{
				path: '',
				redirectTo: 'profile',
				pathMatch: 'full',
			},
			{
				path: 'profile',
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
		ServercontrolMenuComponent,
	],
	imports: [
		CommonModule,
		UiModule,
		RouterModule.forChild(routes),
		DynamicFormsPrimeNGUIModule,
		ReactiveFormsModule,
		UiComponentsModule,
	],
	exports: [RouterModule],
})
export class ServercontrolModule {
	constructor(private breadcrumbService: BreadcrumbService) {
		this.breadcrumbService.addFriendlyNameForRoute('/servercontrol', 'Server Control');
		this.breadcrumbService.addFriendlyNameForRoute('/servercontrol/server', 'Server');
		this.breadcrumbService.addFriendlyNameForRoute('/servercontrol/server/overview', 'Overview');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/servercontrol/server/\\d+/profile', 'Profile');
	}
}
