import sqlite3 from 'sqlite3';

interface User {
	id: string;
	name: string;
	email: string;
	password: string;
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

	public getUserById(id: string): Promise<User> {
		const sql = 'SELECT * FROM users WHERE id = ?';
		return new Promise((resolve, reject) => {
			this.db.get(sql, [id], (err: Error | null, row: User) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		});
	}

	public createUser(name: string, email: string, password: string): Promise<number> {
		const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
		return new Promise((resolve, reject) => {
			this.db.run(sql, [name, email, password], function(this: any, err: Error | null) {
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
