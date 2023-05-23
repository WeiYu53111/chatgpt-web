export const create_user_table = `
	CREATE TABLE IF NOT EXISTS users
	(
		email
		TEXT
		PRIMARY
		KEY
		UNIQUE
		NOT
		NULL,
		password
		TEXT,
		last_login_time
		TEXT,
		vaild
		TEXT,
		level
		INTEGER
		DEFAULT
	(
		1
	)
		);
`;
// Qwe123!@#.  sha-256加密后  12b242cde21be11412f2af47be89393a1cefba37a42dd86170c5f741b0a0e5f6


export const insert_table_users = `
	insert into users (email, password, vaild, level)
	values ("admin@qq.com", "12b242cde21be11412f2af47be89393a1cefba37a42dd86170c5f741b0a0e5f6", 1, 2);
	`;

export const create_table_stats = `
CREATE TABLE IF NOT EXISTS users_stat
	(
		squad_date
		INTEGER,
		email
		TEXT,
		query_count
		INTEGER
		DEFAULT
	(
		0
	),
		UNIQUE
	(
		squad_date,
		email
	)
		);
`;
