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
import { ReactiveFormsModule } from '@angular/forms';

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
				component: SquadProfileComponent,
				data: {
					breadcrumb: 'Add',
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
	],
	imports: [CommonModule, UiModule, RouterModule.forChild(routes), UiComponentsModule, ReactiveFormsModule],
})
export class AdministrationModule {}
