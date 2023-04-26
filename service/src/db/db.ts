import sqlite3 from 'sqlite3';

export interface User {
	email: string,
	password: string,
	last_login_time: string,
	vaild	: string
}

type Callback<T> = (err: Error | null, result?: T) => void;

class Database {
	private db: sqlite3.Database;

	constructor(filename: string) {
		this.db = new sqlite3.Database(filename);
	}

	public getAllUsers(): Promise<User[]> {
		const sql = 'SELECT * FROM users';
		return new Promise((resolve, reject) => {
			this.db.all(sql, [], (err: Error | null, rows: User[]) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	public getUserByName(email: string): Promise<User> {
		const sql = 'SELECT * FROM users WHERE email = ?';
		return new Promise((resolve, reject) => {
			this.db.get(sql, [email], (err: Error | null, row: User) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		});
	}

	public createUser(user:User): Promise<number> {
		const sql = 'INSERT INTO users (email, password,last_login_time,vaild ) VALUES (?, ?, ?,?)';
		return new Promise((resolve, reject) => {
			this.db.run(sql, [user.email,user.password,user.last_login_time,user.vaild], function(this: any, err: Error | null) {
				if (err) {
					reject(err);
				} else {
					resolve(this.lastID);
				}
			});
		});
	}

	public updateUser(id: string, name: string, email: string, password: string): Promise<void> {
		const sql = 'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?';
		return new Promise((resolve, reject) => {
			this.db.run(sql, [name, email, password, id], function(err: Error | null) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	public deleteUser(id: number): Promise<void> {
		const sql = 'DELETE FROM users WHERE id = ?';
		return new Promise((resolve, reject) => {
			this.db.run(sql, [id], function(err: Error | null) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	public close(): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.close((err: Error | null) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}

export { Database };
