CREATE DATABASE tasks;

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	is_completed BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO tasks (name)
VALUES ('Complete this live solve');

SELECT * FROM tasks;