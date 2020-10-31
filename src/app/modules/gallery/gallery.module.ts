import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleryOverviewComponent } from './gallery-overview/gallery-overview.component';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { MissionAttendanceComponent } from '../missions/mission-attendance/mission-attendance.component';
import { MissionReportComponent } from '../missions/mission-report/mission-report.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'overview',
	},
	{
		path: 'overview',
		component: GalleryOverviewComponent,
		data: {
			breadcrumb: 'Overview',
		},
	},
];

@NgModule({
	declarations: [GalleryOverviewComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class GalleryModule {}
