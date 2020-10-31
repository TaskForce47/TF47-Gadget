import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionAttendanceComponent } from './mission-attendance/mission-attendance.component';
import { MissionReportComponent } from './mission-report/mission-report.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'attendance',
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
	declarations: [MissionAttendanceComponent, MissionReportComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MissionsModule {}
