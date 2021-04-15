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
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { CalendarOverviewComponent } from './calendar/calendar-overview/calendar-overview.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'servers',
		pathMatch: 'full',
	},
	{
		path: 'servers',
		component: ServersComponent,
	},
	{
		path: 'calendar',
		component: CalendarOverviewComponent,
	},
	{
		path: 'changelog',
		component: ChangelogComponent,
	},
	{
		path: 'squads',
		component: SquadsComponent,
	},
	{
		path: 'issues',
		component: IssueComponent,
		children: [
			{
				path: '',
				redirectTo: 'overview',
				pathMatch: 'full',
			},
			{
				path: 'overview',
				component: IssueOverviewComponent,
			},
			{
				path: ':id',
				component: IssueProfileComponent,
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
		CalendarOverviewComponent,
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
export class CommunityModule {
	constructor(private breadcrumbService: BreadcrumbService) {
		this.breadcrumbService.addFriendlyNameForRoute('/community', 'Community');
		this.breadcrumbService.addFriendlyNameForRoute('/community/servers', 'Servers');
		this.breadcrumbService.addFriendlyNameForRoute('/community/changelog', 'Changelog');
		this.breadcrumbService.addFriendlyNameForRoute('/community/squads', 'Squads');
		this.breadcrumbService.addFriendlyNameForRoute('/community/issues', 'Issues');
		this.breadcrumbService.addFriendlyNameForRoute('/community/issues/overview', 'Overview');
		this.breadcrumbService.addFriendlyNameForRoute('/community/calendar', 'Calendar');
	}
}
