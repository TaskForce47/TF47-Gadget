export class Navigation {
	links = [
		{
			label: 'Dashboard',
			tooltip: 'Dashboard',
			routerLink: '/',
			permissions: [],
			icon: 'mdi-home',
			items: [],
		},
		{
			label: 'Community',
			tooltip: '',
			routerLink: '',
			permissions: [],
			icon: '',
			items: [
				{
					label: 'Servers',
					icon: 'mdi-gamepad-variant',
					routerLink: '/community/servers',
					permissions: [],
				},
				{
					label: 'Calendar',
					icon: 'mdi-calendar',
					routerLink: '/community/calendar',
					permissions: ['preview'],
				},
				{
					label: 'Squads',
					icon: 'mdi-account-group',
					routerLink: '/community/squads',
					permissions: ['squad:view'],
				},
				/*				{
					label: 'Issues',
					icon: 'mdi-alert-circle',
					routerLink: '/community/issues',
					permissions: ['preview'],
				},
				{
					label: 'Changelog',
					icon: 'mdi-account-hard-hat',
					routerLink: '/community/changelog',
					permissions: ['preview'],
				},*/
				{
					label: 'Donations',
					icon: 'mdi-account-cash',
					routerLink: '/community/donations',
					permissions: [],
				},
				{
					label: 'Guides',
					icon: 'mdi-clipboard-text',
					routerLink: '/community/guide',
					permissions: [],
				},
			],
		},
		/*		{
			label: 'Gallery',
			tooltip: 'Gallery',
			routerLink: '/gallery',
			permissions: ['preview'],
			icon: '',
			items: [
				{
					label: 'Overview',
					icon: 'mdi-folder-image',
					routerLink: '/gallery/overview',
					permissions: [],
				},
				{
					label: 'Upload File',
					icon: 'mdi-upload',
					routerLink: '/gallery/upload',
					permissions: [],
				},
			],
		},*/
		{
			label: 'Events',
			tooltip: '',
			routerLink: '',
			permissions: ['preview'],
			icon: '',
			items: [
				{
					label: 'Campaigns',
					icon: 'mdi-folder-image',
					routerLink: '/campaigns',
					permissions: [],
				},
			],
		},
		{
			label: 'Administration',
			tooltip: '',
			routerLink: '',
			permissions: ['administration:view'],
			icon: 'pi pi-cog',
			items: [
				{
					label: 'User Manager',
					icon: 'mdi-account-cog',
					routerLink: '/administration/usermanager',
					permissions: ['user:view'],
				},
				{
					label: 'Group Manager',
					icon: 'mdi-account-group',
					routerLink: '/administration/groupmanager',
					permissions: ['group:update'],
				},
				{
					label: 'Player Manager',
					icon: 'mdi-account-search',
					routerLink: '/administration/playermanager',
					permissions: ['note:view'],
				},
				{
					label: 'Squad Manager',
					icon: 'mdi-account-supervisor',
					routerLink: '/administration/squadmanager',
					permissions: ['squad:update'],
				},
				{
					label: 'Server Control',
					icon: 'mdi-server',
					routerLink: '/servercontrol/',
					permissions: ['server:view'],
				},
				{
					label: 'Event Manager',
					icon: 'mdi-calendar-edit',
					routerLink: '/administration/eventmanager',
					permissions: ['preview'],
				},
				/*				{
					label: 'Live Map',
					icon: 'mdi-eye',
					routerLink: '/administration/live',
					permissions: ['preview'],
				},*/
				{
					label: 'Logs',
					icon: 'mdi-clipboard-text',
					routerLink: '/administration/logs',
					permissions: ['preview'],
				},
			],
		},
	];
}
