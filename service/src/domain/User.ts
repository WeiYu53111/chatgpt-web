export interface User {
	email: string;
	password: string;
	last_login_time: string;
	valid: boolean;
	level: number;
}

export class UserEntity implements User {
	constructor(public email: string, public password: string, public last_login_time: string, public valid = true, public level = 1) {}
}
