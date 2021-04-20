import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionAttendanceComponent } from './mission/mission-attendance/mission-attendance.component';
import { MissionReportComponent } from './mission/mission-report/mission-report.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { CampaignOverviewComponent } from './campaign/campaign-overview/campaign-overview.component';
import { MissionProfileComponent } from './mission/mission-profile/mission-profile.component';
import { CampaignComponent } from './campaign/campaign/campaign.component';
import { MissionSlottingComponent } from './mission/mission-slotting/mission-slotting.component';
import { MissionComponent } from './mission/mission/mission.component';
import { CampaignWrapperComponent } from './campaign/campaign-wrapper/campaign-wrapper.component';
import { CampaignMissionComponent } from './campaign/campaign-mission/campaign-mission.component';
import { CampaignMissionOverviewComponent } from './campaign/campaign-mission-overview/campaign-mission-overview.component';
import { CampaignDescriptionComponent } from './campaign/campaign-description/campaign-description.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'overview',
	},
	{
		path: 'overview',
		component: CampaignOverviewComponent,
	},
	{
		path: ':id',
		component: CampaignComponent,
		children: [
			{ path: '', pathMatch: 'full', redirectTo: 'description' },
			{
				path: 'description',
				component: CampaignDescriptionComponent,
			},
			{
				path: 'missions/overview',
				component: CampaignMissionOverviewComponent,
			},
		],
	},
	{
		path: ':id/missions',
		component: CampaignWrapperComponent,
		children: [
			{
				path: ':mid',
				component: MissionComponent,
				children: [
					{ path: '', pathMatch: 'full', redirectTo: 'description' },
					{
						path: 'slotting',
						component: MissionSlottingComponent,
					},
					{
						path: 'aar',
						component: MissionReportComponent,
					},
					{
						path: 'description',
						component: MissionProfileComponent,
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
		MissionProfileComponent,
		CampaignComponent,
		MissionSlottingComponent,
		MissionComponent,
		CampaignWrapperComponent,
		CampaignMissionComponent,
		CampaignMissionOverviewComponent,
		CampaignDescriptionComponent,
	],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MissionsModule {}
