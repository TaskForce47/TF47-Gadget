export interface Squad {
	squadId: number;
	nick: string;
	title: string;
	name: string;
	mail: string;
	website: string;
	squadImageLink: string;
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
