CREATE TABLE IF NOT EXISTS users (
    email           VARCHAR(50) PRIMARY KEY,
    password        VARCHAR(250),
    create_time     DATETIME default CURRENT_TIMESTAMP,
    last_login_time DATETIME ,
    valid           integer default 1,
    level           INTEGER DEFAULT 1
);



CREATE TABLE IF NOT EXISTS users_stat (
    squad_date  INT,
    email VARCHAR(50),
    query_count INT DEFAULT 0,
    UNIQUE(squad_date, email)
);

/*   Qwe123!@#.  sha-256加密后  0b9ac3709d0a1c1771dc00d8899fbcebd6e375e1cc4ddb3e50fd1c5951a25223   */
insert into users (email, password,level)
values ("admin@qq.com", "123456",0);
