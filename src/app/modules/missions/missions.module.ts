import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionAttendanceComponent } from './mission/mission-attendance/mission-attendance.component';
import { MissionReportComponent } from './mission/mission-report/mission-report.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { CampaignOverviewComponent } from './campaign/campaign-overview/campaign-overview.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'attendance',
	},
	{
		path: 'overview',
		component: CampaignOverviewComponent,
		data: {
			breadcrumb: 'Overview',
		},
	},
	{
		path: 'attendance',
		component: MissionAttendanceComponent,
		data: {
			breadcrumb: 'Attendance',
		},
	},
	{
		path: 'after-action-report',
		component: MissionReportComponent,
		data: {
			breadcrumb: 'After Action Report',
		},
	},
];

@NgModule({
	declarations: [MissionAttendanceComponent, MissionReportComponent, CampaignOverviewComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MissionsModule {}
