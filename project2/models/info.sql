DROP DATABASE IF EXISTS gamegiphy;
CREATE DATABASE gamegiphy;

\c gamegiphy;

CREATE TABLE players (
	ID SERIAL PRIMARY KEY,
	Name TEXT
);

CREATE TABLE caption (
    Player_ID INTEGER REFERENCES players (ID),
	Sentence TEXT
);

CREATE TABLE status (
    Player_ID INTEGER REFERENCES players (ID),
	Posted BOOLEAN
);

CREATE TABLE points (
    Player_ID INTEGER REFERENCES players (ID),
	Votes INTEGER
);

CREATE TABLE giphyURL (
	ID SERIAL PRIMARY KEY,
	Url TEXT
);

-- INSERT INTO players (name, caption)
-- 	VALUES
--     ('Player 1', ' '),
--     ('Player 2', ' '),
--     ('Player 3', ' '),
--     ('Player 4', ' ');

-- INSERT INTO status (player_id, posted)
-- 	VALUES
--     (1, false),
-- 	(2, false),
-- 	(3, false),
--     (4, false);

-- INSERT INTO points (player_id, votes, total)
-- 	VALUES
--     (1, 0,0),
-- 	(2, 0,0),
-- 	(3, 0,0),
--     (4, 0,0);