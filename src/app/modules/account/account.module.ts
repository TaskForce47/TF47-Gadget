import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '../../ui/ui.module';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountComponent } from './account/account.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { FormlyModule } from '@ngx-formly/core';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '',
		component: AccountComponent,
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
				path: 'settings',
				component: AccountSettingsComponent,
				data: {
					breadcrumb: 'Settings',
				},
			},
		],
	},
];

@NgModule({
	declarations: [AccountComponent, AccountProfileComponent, AccountSettingsComponent],
	imports: [
		CommonModule,
		UiModule,
		RouterModule.forChild(routes),
		UiComponentsModule,
		FormlyModule,
		ReactiveFormsModule,
	],
	exports: [RouterModule],
})
export class AccountModule {}
