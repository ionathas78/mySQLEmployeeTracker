USE EmployeeTracker;

DROP TABLE IF EXISTS employee;

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL UNIQUE PRIMARY KEY,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    user_name VARCHAR(64) NOT NULL,
    access INTEGER DEFAULT 0,
    password VARCHAR(64) NULL,
    role_id INTEGER,
    manager_id INTEGER,
    email VARCHAR(128) NULL,
    extension INTEGER NULL,
    computer_name VARCHAR(64) NULL
);
