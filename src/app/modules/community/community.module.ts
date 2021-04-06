import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServersComponent } from './servers/servers.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { SquadsComponent } from './squads/squads.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { IssueOverviewComponent } from './issues/issue-overview/issue-overview.component';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { IssueProfileComponent } from './issues/issue-profile/issue-profile.component';
import { IssueComponent } from './issues/issue/issue.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'servers',
		pathMatch: 'full',
	},
	{
		path: 'servers',
		component: ServersComponent,
		data: {
			breadcrumb: 'Servers',
		},
	},
	{
		path: 'changelog',
		component: ChangelogComponent,
		data: {
			breadcrumb: 'Changelog',
		},
	},
	{
		path: 'squads',
		component: SquadsComponent,
		data: {
			breadcrumb: 'Squads',
		},
	},
	{
		path: 'issues',
		component: IssueComponent,
		data: {
			breadcrumb: 'Issues',
		},
		children: [
			{
				path: '',
				redirectTo: 'overview',
				pathMatch: 'full',
			},
			{
				path: 'overview',
				component: IssueOverviewComponent,
				data: {
					breadcrumb: 'Overview',
				},
			},
			{
				path: ':id',
				component: IssueProfileComponent,
				data: {
					breadcrumb: '',
				},
			},
		],
	},
];

@NgModule({
	declarations: [
		ServersComponent,
		SquadsComponent,
		IssueOverviewComponent,
		IssueProfileComponent,
		IssueComponent,
		ChangelogComponent,
	],
	imports: [
		CommonModule,
		UiModule,
		RouterModule.forChild(routes),
		UiComponentsModule,
		DynamicFormsPrimeNGUIModule,
		ReactiveFormsModule,
		HighchartsChartModule,
	],
	exports: [RouterModule],
})
export class CommunityModule {}
