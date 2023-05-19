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

	insert into users (email, password, vaild, level)
	values ("admin@qq.com", "Qwe123!@#.", 1, 2);
`;
