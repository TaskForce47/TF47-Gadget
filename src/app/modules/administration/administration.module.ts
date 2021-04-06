import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../../ui/ui.module';
import { RouterModule, Routes } from '@angular/router';
import { SquadOverviewComponent } from './squadmanager/squad-overview/squad-overview.component';
import { SquadProfileComponent } from './squadmanager/squad-profile/squad-profile.component';
import { PlayerProfileComponent } from './playermanager/player-profile/player-profile.component';
import { PlayermanagerComponent } from './playermanager/playermanager/playermanager.component';
import { SquadmanagerComponent } from './squadmanager/squadmanager/squadmanager.component';
import { LogsComponent } from './logs/logs/logs.component';
import { LogTableComponent } from './logs/log-table/log-table.component';
import { UiComponentsModule } from '../../ui-components/ui-components.module';
import { PlayerNotesComponent } from './playermanager/player-notes/player-notes.component';
import { PlayerChatComponent } from './playermanager/player-chat/player-chat.component';
import { PlayerWhitelistComponent } from './playermanager/player-whitelist/player-whitelist.component';
import { PlayerStatisticsComponent } from './playermanager/player-statistics/player-statistics.component';
import { LiveMapComponent } from './live-map/live-map.component';
import { PlayerListComponent } from './map/player-list/player-list.component';
import { TaskListComponent } from './map/task-list/task-list.component';
import { MissionLogComponent } from './map/mission-log/mission-log.component';
import { PlayerControlsComponent } from './map/player-controls/player-controls.component';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { SquadSettingsComponent } from './squadmanager/squad-settings/squad-settings.component';
import { SquadWrapperComponent } from './squadmanager/squad-wrapper/squad-wrapper.component';
import { UsermanagerComponent } from './usermanager/usermanager/usermanager.component';
import { UserProfileComponent } from './usermanager/user-profile/user-profile.component';
import { UserKeysComponent } from './usermanager/user-keys/user-keys.component';
import { UserGroupsComponent } from './usermanager/user-groups/user-groups.component';
import { GroupmanagerComponent } from './groupmanager/groupmanager/groupmanager.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'playermanager',
		pathMatch: 'full',
	},
	{
		path: 'playermanager',
		component: PlayermanagerComponent,
		data: {
			breadcrumb: 'Player Manager',
		},
		children: [
			{
				path: ':id',
				component: PlayerProfileComponent,
				data: {
					breadcrumb: 'Add',
				},
				children: [
					{ path: '', redirectTo: 'notes', pathMatch: 'full' },
					{
						path: 'notes',
						component: PlayerNotesComponent,
						data: {
							breadcrumb: 'Notes',
						},
					},
					{
						path: 'whitelist',
						component: PlayerWhitelistComponent,
						data: {
							breadcrumb: 'Whitelist',
						},
					},
					{
						path: 'chat',
						component: PlayerChatComponent,
						data: {
							breadcrumb: 'Chat',
						},
					},
					{
						path: 'stats',
						component: PlayerStatisticsComponent,
						data: {
							breadcrumb: 'Statistics',
						},
					},
				],
			},
		],
	},
	{
		path: 'squadmanager',
		component: SquadmanagerComponent,
		data: {
			breadcrumb: 'Squad Manager',
		},
		children: [
			{
				path: '',
				redirectTo: 'overview',
			},
			{
				path: 'overview',
				component: SquadOverviewComponent,
				data: {
					breadcrumb: 'Overview',
				},
			},
			{
				path: ':id',
				component: SquadWrapperComponent,
				data: {
					breadcrumb: '',
				},
				children: [
					{ path: '', redirectTo: 'profile', pathMatch: 'full' },
					{
						path: 'profile',
						component: SquadProfileComponent,
						data: {
							breadcrumb: 'Profile',
						},
					},
					{
						path: 'settings',
						component: SquadSettingsComponent,
						data: {
							breadcrumb: 'Settings',
						},
					},
				],
			},
		],
	},
	{ path: 'logs', redirectTo: 'logs/chat' },
	{
		path: 'logs/:type',
		component: LogsComponent,
		data: {
			breadcrumb: 'Logs',
		},
	},
	{
		path: 'live',
		component: LiveMapComponent,
		data: {
			breadcrumb: 'Live Map',
		},
	},
	{
		path: 'usermanager',
		component: UsermanagerComponent,
		data: {
			breadcrumb: 'User Manager',
		},
		children: [
			{
				path: ':id',
				component: UserProfileComponent,
				data: {
					breadcrumb: '',
				},
				children: [
					{ path: '', redirectTo: 'groups', pathMatch: 'full' },
					{
						path: 'groups',
						component: UserGroupsComponent,
						data: {
							breadcrumb: 'Groups',
						},
					},
					{
						path: 'keys',
						component: UserKeysComponent,
						data: {
							breadcrumb: 'Api Keys',
						},
					},
				],
			},
		],
	},
	{
		path: 'groupmanager',
		component: GroupmanagerComponent,
		data: {
			breadcrumb: 'User Manager',
		},
		children: [
			{
				path: ':id',
				component: UserProfileComponent,
				data: {
					breadcrumb: '',
				},
				children: [{ path: '', redirectTo: 'groups', pathMatch: 'full' }],
			},
		],
	},
];
@NgModule({
	declarations: [
		SquadOverviewComponent,
		SquadProfileComponent,
		PlayerProfileComponent,
		PlayermanagerComponent,
		SquadmanagerComponent,
		LogsComponent,
		LogTableComponent,
		PlayerNotesComponent,
		PlayerChatComponent,
		PlayerWhitelistComponent,
		PlayerStatisticsComponent,
		LiveMapComponent,
		PlayerListComponent,
		TaskListComponent,
		MissionLogComponent,
		PlayerControlsComponent,
		SquadSettingsComponent,
		SquadWrapperComponent,
		UsermanagerComponent,
		UserProfileComponent,
		UserKeysComponent,
		UserGroupsComponent,
		GroupmanagerComponent,
	],
	imports: [
		CommonModule,
		UiModule,
		RouterModule.forChild(routes),
		UiComponentsModule,
		DynamicFormsPrimeNGUIModule,
		ReactiveFormsModule,
	],
})
export class AdministrationModule {}
