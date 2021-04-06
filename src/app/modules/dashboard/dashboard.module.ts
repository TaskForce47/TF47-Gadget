import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { UiComponentsModule } from '../../ui-components/ui-components.module';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		data: {
			breadcrumb: 'Dashboard',
		},
	},
];

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, UiModule, UiComponentsModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardModule {}
