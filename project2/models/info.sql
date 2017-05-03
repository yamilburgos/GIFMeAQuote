DROP DATABASE IF EXISTS gamegiphy;
CREATE DATABASE gamegiphy;

\c gamegiphy;

CREATE TABLE playerList (
	ID SERIAL PRIMARY KEY,
	Name TEXT,
	Caption TEXT,
	Votes INTEGER,
	Total INTEGER,
	Posted BOOLEAN
);

INSERT INTO playerList (name, caption, votes, total, posted) 
	VALUES('Jack', 'It is ice to meet you', 1, 3, true);