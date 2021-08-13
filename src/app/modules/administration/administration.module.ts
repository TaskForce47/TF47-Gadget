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
import { LiveMapComponent } from './live-map/live-map/live-map.component';
import { PlayerListComponent } from './live-map/map/player-list/player-list.component';
import { TaskListComponent } from './live-map/map/task-list/task-list.component';
import { MissionLogComponent } from './live-map/map/mission-log/mission-log.component';
import { PlayerControlsComponent } from './live-map/map/player-controls/player-controls.component';
import { DynamicFormsPrimeNGUIModule } from '@ng-dynamic-forms/ui-primeng';
import { ReactiveFormsModule } from '@angular/forms';
import { SquadSettingsComponent } from './squadmanager/squad-settings/squad-settings.component';
import { SquadWrapperComponent } from './squadmanager/squad-wrapper/squad-wrapper.component';
import { UsermanagerComponent } from './usermanager/usermanager/usermanager.component';
import { UserProfileComponent } from './usermanager/user-profile/user-profile.component';
import { UserKeysComponent } from './usermanager/user-keys/user-keys.component';
import { UserGroupsComponent } from './usermanager/user-groups/user-groups.component';
import { GroupmanagerComponent } from './groupmanager/groupmanager/groupmanager.component';
import { GroupOverviewComponent } from './groupmanager/group-overview/group-overview.component';
import { GroupProfileComponent } from './groupmanager/group-profile/group-profile.component';
import { GroupUserComponent } from './groupmanager/group-user/group-user.component';
import { GroupPermissionComponent } from './groupmanager/group-permission/group-permission.component';
import { GroupSettingsComponent } from './groupmanager/group-settings/group-settings.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';
import { EventOverviewComponent } from './eventmanager/event-overview/event-overview.component';
import { EventAddComponent } from './eventmanager/event-add/event-add.component';
import { EventProfileComponent } from './eventmanager/event-profile/event-profile.component';
import { EventComponent } from './eventmanager/event/event.component';
import { EventmanagerComponent } from './eventmanager/eventmanager/eventmanager.component';
import { EventDescriptionComponent } from './eventmanager/event-description/event-description.component';
import { EventSlottingComponent } from './eventmanager/event-slotting/event-slotting.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'playermanager',
		pathMatch: 'full',
	},
	{
		path: 'playermanager',
		component: PlayermanagerComponent,
		children: [
			{
				path: ':id',
				component: PlayerProfileComponent,
				children: [
					{ path: '', redirectTo: 'notes', pathMatch: 'full' },
					{
						path: 'notes',
						component: PlayerNotesComponent,
					},
					{
						path: 'whitelist',
						component: PlayerWhitelistComponent,
					},
					{
						path: 'chat',
						component: PlayerChatComponent,
					},
					{
						path: 'stats',
						component: PlayerStatisticsComponent,
					},
				],
			},
		],
	},
	{
		path: 'squadmanager',
		component: SquadmanagerComponent,
		children: [
			{
				path: '',
				redirectTo: 'overview',
			},
			{
				path: 'overview',
				component: SquadOverviewComponent,
			},
			{
				path: ':id',
				component: SquadWrapperComponent,
				children: [
					{ path: '', redirectTo: 'profile', pathMatch: 'full' },
					{
						path: 'profile',
						component: SquadProfileComponent,
					},
					{
						path: 'settings',
						component: SquadSettingsComponent,
					},
				],
			},
		],
	},
	{ path: 'logs', redirectTo: 'logs/ticket' },
	{
		path: 'logs/:type',
		component: LogsComponent,
	},
	{
		path: 'live',
		component: LiveMapComponent,
	},
	{
		path: 'usermanager',
		component: UsermanagerComponent,
		children: [
			{
				path: ':id',
				component: UserProfileComponent,
				children: [
					{ path: '', redirectTo: 'groups', pathMatch: 'full' },
					{
						path: 'groups',
						component: UserGroupsComponent,
					},
					{
						path: 'keys',
						component: UserKeysComponent,
					},
				],
			},
		],
	},
	{
		path: 'groupmanager',
		component: GroupmanagerComponent,
		children: [
			{ path: '', redirectTo: 'overview', pathMatch: 'full' },
			{
				path: 'overview',
				component: GroupOverviewComponent,
			},
			{
				path: ':id',
				component: GroupProfileComponent,
				children: [
					{ path: '', redirectTo: 'member', pathMatch: 'full' },
					{
						path: 'member',
						component: GroupUserComponent,
					},
					{
						path: 'permission',
						component: GroupPermissionComponent,
					},
					{
						path: 'settings',
						component: GroupSettingsComponent,
					},
				],
			},
		],
	},
	{
		path: 'eventmanager',
		component: EventmanagerComponent,
		children: [
			{
				path: '',
				redirectTo: 'event/overview',
				pathMatch: 'full',
			},
			{
				path: 'event',
				redirectTo: 'event/overview',
				pathMatch: 'full',
			},
			{
				path: 'event/overview',
				component: EventOverviewComponent,
			},
			{
				path: 'event/add',
				component: EventAddComponent,
			},
			{
				path: 'event/:id',
				component: EventComponent,
				children: [
					{
						path: '',
						redirectTo: 'profile',
						pathMatch: 'full',
					},
					{
						path: 'profile',
						component: EventProfileComponent,
					},
					{
						path: 'description',
						component: EventDescriptionComponent,
					},
					{
						path: 'slotting',
						component: EventSlottingComponent,
					},
				],
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
		GroupOverviewComponent,
		GroupProfileComponent,
		GroupUserComponent,
		GroupPermissionComponent,
		GroupSettingsComponent,
		EventOverviewComponent,
		EventAddComponent,
		EventProfileComponent,
		EventComponent,
		EventmanagerComponent,
		EventDescriptionComponent,
		EventSlottingComponent,
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
export class AdministrationModule {
	constructor(private breadcrumbService: BreadcrumbService) {
		this.breadcrumbService.addFriendlyNameForRoute('/administration', 'Administration');

		// User Manager
		this.breadcrumbService.addFriendlyNameForRoute('/administration/usermanager', 'User Manager');
		// this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/usermanager/[0-9 a-z -]+$', 'Moin');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/usermanager/[0-9 a-z -]+/groups', 'Groups');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/usermanager/[0-9 a-z -]+/keys', 'Api Keys');

		// Group Manager
		this.breadcrumbService.addFriendlyNameForRoute('/administration/groupmanager', 'Group Manager');
		this.breadcrumbService.addFriendlyNameForRoute('/administration/groupmanager/overview', 'Overview');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/groupmanager/\\d+/member', 'Member');
		this.breadcrumbService.addFriendlyNameForRouteRegex(
			'^/administration/groupmanager/\\d+/permission',
			'Permissions'
		);
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/groupmanager/\\d+/settings', 'Settings');

		// Player Manager
		this.breadcrumbService.addFriendlyNameForRoute('/administration/playermanager', 'Player Manager');
		// this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/playermanager/\\d+$', 'Moin'); TODO
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/playermanager/\\d+/notes', 'Notes');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/playermanager/\\d+/whitelist', 'Whitelist');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/playermanager/\\d+/chat', 'Chat');

		// Squad Manager
		this.breadcrumbService.addFriendlyNameForRoute('/administration/squadmanager', 'Squad Manager');
		this.breadcrumbService.addFriendlyNameForRoute('/administration/squadmanager/overview', 'Overview');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/squadmanager/\\d+/profile', 'Profile');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/administration/squadmanager/\\d+/settings', 'Settings');

		// Server Control
		this.breadcrumbService.addFriendlyNameForRoute('/servercontrol/server', 'Server Control');
		this.breadcrumbService.addFriendlyNameForRoute('/servercontrol/server', 'Server');
		this.breadcrumbService.addFriendlyNameForRoute('/servercontrol/server/overview', 'Overview');
		this.breadcrumbService.addFriendlyNameForRouteRegex('^/servercontrol/server/\\d+/profile', 'Profile');

		// Live Map
		this.breadcrumbService.addFriendlyNameForRoute('/administration/live', 'Live Map');
	}
}
