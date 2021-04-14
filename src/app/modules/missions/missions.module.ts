import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionAttendanceComponent } from './mission/mission-attendance/mission-attendance.component';
import { MissionReportComponent } from './mission/mission-report/mission-report.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { CampaignOverviewComponent } from './campaign/campaign-overview/campaign-overview.component';
import { CampaignProfileComponent } from './campaign/campaign-profile/campaign-profile.component';
import { MissionProfileComponent } from './mission/mission-profile/mission-profile.component';
import { CampaignComponent } from './campaign/campaign/campaign.component';
import { MissionSlottingComponent } from './mission/mission-slotting/mission-slotting.component';
import { MissionComponent } from './mission/mission/mission.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'overview',
	},
	{
		path: 'overview',
		component: CampaignOverviewComponent,
		data: {
			breadcrumb: 'Overview',
		},
	},
	{
		path: ':id',
		component: CampaignComponent,
		data: {
			breadcrumb: '',
		},
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'profile' },
			{
				path: 'profile',
				component: CampaignProfileComponent,
				data: {
					breadcrumb: 'Profile',
				},
			},
			{
				path: 'mission/:mid',
				component: MissionComponent,
				data: {
					breadcrumb: 'Mission',
				},
				children: [
					{ path: '', pathMatch: 'full', redirectTo: 'slotting' },
					{
						path: 'slotting',
						component: MissionSlottingComponent,
						data: {
							breadcrumb: 'Slotting',
						},
					},
				],
			},
		],
	},
];

@NgModule({
	declarations: [
		MissionAttendanceComponent,
		MissionReportComponent,
		CampaignOverviewComponent,
		CampaignProfileComponent,
		MissionProfileComponent,
		CampaignComponent,
		MissionSlottingComponent,
		MissionComponent,
	],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MissionsModule {}
