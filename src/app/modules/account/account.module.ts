import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountComponent } from './account/account.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountKeysComponent } from './account-keys/account-keys.component';

const routes: Routes = [
	{
		path: 'account',
		component: AccountComponent,
		data: {
			breadcrumb: 'Account',
		},
		children: [
			{ path: '', redirectTo: 'profile', pathMatch: 'full' },
			{
				path: 'profile',
				component: AccountProfileComponent,
				data: {
					breadcrumb: 'Profile',
				},
			},
			{
				path: 'keys',
				component: AccountKeysComponent,
				data: {
					breadcrumb: 'Api Keys',
				},
			},
		],
	},
];

@NgModule({
	declarations: [AccountComponent, AccountProfileComponent, AccountKeysComponent],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes), UiComponentsModule, ReactiveFormsModule],
	exports: [RouterModule],
})
export class AccountModule {}
