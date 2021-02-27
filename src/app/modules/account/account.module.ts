import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountComponent } from './account/account.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
	{
		path: '',
		component: AccountComponent,
		pathMatch: 'full',
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{
				path: 'profile',
				component: AccountProfileComponent,
				data: {
					breadcrumb: 'Profile',
				},
			},
		],
	},
];

@NgModule({
	declarations: [AccountComponent, AccountProfileComponent, LoginComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes), UiComponentsModule, ReactiveFormsModule],
	exports: [RouterModule, LoginComponent],
})
export class AccountModule {}
