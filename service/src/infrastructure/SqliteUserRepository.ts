import sqlite3 from 'sqlite3';
import {UserRepository} from '../repository/UserRepository';
import {UserEntity, User} from '../domain/User';
import {create_user_table,create_table_stats,insert_table_users} from "../db/create_db"

type Callback<T> = (err: Error | null, result?: T) => void;

class SqliteUserRepository implements UserRepository {
	private db: sqlite3.Database;

	constructor(filename: string) {
		//this.db = new sqlite3.Database(filename);
		//todo 实在太恶心了,得改啊!!!!!!!
		this.db = new sqlite3.Database(filename, (err) => {
			if (err) {
				console.error(err.message);
				throw err;
			} else {
				console.log('Connected to the SQLite database.');

				/*this.db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`, (err, row) => {
					if (!row) {*/
						this.db.serialize(() => {
							this.db.run(create_user_table, (err) => {
								if (err) {
									console.log('Error creating users table:', err);
									process.exit(1)
								} else {
									console.log('Users table created');
								}
							});

							this.db.run(insert_table_users, (err)=>{
								if(err){
									console.log("user admin already exists")
								}else{
									console.log("insert user admin")
								}
							});

							this.db.run(create_table_stats, (err) => {
								if (err) {
									console.log('Error creating users_stat table:', err);
									process.exit(1)
								} else {
									console.log('users_stat table created');
								}
							});
						});
					/*}
				})*/
			}
		});
	}

	public initDb() {
		/*console.log(create_user_table)
		const db = this.db
		this.db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='users'`, (err, row) => {
			if (!row) {
				db.exec(create_user_table, (err) => {
					if (err) console.log('Error creating table:', err);
					process.exit(1)
				});
			}
		})*/
	}

	public async getAllUsers(): Promise<User[]> {
		const sql = 'SELECT * FROM users';
		const rows = await this.query<User[]>(sql, []);
		return rows.map((row) => this.mapToUser(row));
	}

	public getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
		const sql = 'SELECT * FROM users WHERE email = ? and password = ?';
		return this.querySingle<User>(sql, [email, password]).then((row) => row && this.mapToUser(row));
	}

	public getUserByEmail(email: string): Promise<User | undefined> {
		const sql = 'SELECT * FROM users WHERE email = ?';
		return this.querySingle<User>(sql, [email]).then((row) => row && this.mapToUser(row));
	}

	public createUser(user: User): Promise<void> {
		const sql = 'INSERT INTO users (email, password,last_login_time,vaild ) VALUES (?, ?, ?,?)';
		return this.run(sql, [user.email,user.password,user.last_login_time,user.valid]);
	}

	public updateUser(user: User): Promise<void> {
		const sql = 'UPDATE users SET password = ? WHERE email = ?';
		return this.run(sql, [user.password,user.email]);
	}

	public deleteUser(email: string): Promise<void> {
		const sql = 'DELETE FROM users WHERE email = ?';
		return this.run(sql, [email]);
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

	public getCountByEmail(email: string,day: number): Promise<number> {
		const sql = 'SELECT query_count FROM users_stat WHERE email = ? and squad_date = ?';
		return this.querySingle<any>(sql, [email,day]).then((count) =>{
			return count.query_count
		}).catch( err =>{
			return 0
		});
	}

	updateCountByEmail(email: string, day: number,count:number): Promise<void> {
		const sql = 'INSERT OR REPLACE INTO users_stat (squad_date,email,query_count) VALUES(?,?,?)';
		return this.run(sql, [day,email,count]);
	}

	private async query<T>(sql: string, params: any[]): Promise<T[]> {
		return new Promise((resolve, reject) => {
			this.db.all(sql, params, (err: Error | null, rows: T[]) => {
				if (err) {
					reject(err);
				} else {
					resolve(rows);
				}
			});
		});
	}

	private async querySingle<T>(sql: string, params: any[]): Promise<T | undefined> {
		return new Promise((resolve, reject) => {
			this.db.get(sql, params, (err: Error | null, row: T) => {
				if (err) {
					reject(err);
				} else {
					resolve(row);
				}
			});
		});
	}

	private mapToUser(row: any): User {
		return new UserEntity(row.email, row.password, row.last_login_time, row.valid, row.id);
	}

	private async run(sql: string, params: any[]): Promise<void> {
		return new Promise((resolve, reject) => {
			this.db.run(sql, params, (err: Error | null) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}

const instance = new SqliteUserRepository("user.db")


export default instance
