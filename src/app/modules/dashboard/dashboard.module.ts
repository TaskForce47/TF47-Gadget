import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
];

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DashboardModule {}
