export interface Squad {
	squadId: number;
	nick: string;
	title: string;
	name: string;
	mail: string;
	website: string;
	squadImageLink: string;
	squadXmlLink: string;
	squadMembers: SquadMember[];
}
export interface SquadMember {
	mail: string;
	remark: string;
	steamId: string;
	userId: string;
	username: string;
	squadMemberId: number;
}

export interface User {
	allowEmails: boolean;
	apiKeys: [];
	banned: boolean;
	countryCode: string;
	discordId: string;
	email: string;
	firstTimeSeen: string;
	lastTimeSeen: string;
	profilePicture: string;
	profileUrl: string;
	steamId: string;
	userGroups: [];
	userId: string;
	username: string;
	writtenChangelogs: [];
	writtenNotes: [];
}

export interface Group {
	groupId: number;
	name: string;
	description: string;
	textColor: string;
	backgroundColor: string;
	isVisible: boolean;
	groupMembers?: GroupMembersEntity[] | null;
	permissions?: PermissionsEntity[] | null;
}
export interface GroupMembersEntity {
	userId: string;
	banned: boolean;
	email: string;
	username: string;
	allowEmails: boolean;
	countryCode: string;
	discordId: string;
	profilePicture: string;
	profileUrl: string;
	steamId: string;
	firstTimeSeen: string;
	lastTimeSeen: string;
}
export interface PermissionsEntity {
	permissionId: number;
	type: number;
	name: string;
}

export interface Permission {
	name: string;
	permissionId: number;
	type: string;
}

export interface Campaign {
	campaignId: number;
	name: string;
	description: string;
	missions: Mission[];
	timeCreated: string;
}

export interface Mission {
	name: string;
	missionId: number;
	description: string;
	descriptionShort: string;
	missionType: string;
	campaignId: number;
	campaignName: string;
}

export interface Donation {
	donationId: number;
	username: string;
	guid: string;
	note: string;
	amount: number;
	timeOfDonation: string;
}

export interface GameServer {
	branch: string;
	description: string;
	gameServerStatus: string;
	ip: string;
	port: string;
	lastTimeStarted: string;
	name: string;
	serverId: number;
}
