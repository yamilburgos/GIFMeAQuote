DROP DATABASE IF EXISTS giphyquotes;
CREATE DATABASE giphyquotes;

\c giphyquotes;

CREATE TABLE author (
	ID SERIAL PRIMARY KEY,
	Name TEXT
);

CREATE TABLE caption (
    ID SERIAL PRIMARY KEY,
	Sentence TEXT
);

CREATE TABLE quote (
    ID SERIAL PRIMARY KEY,
    Name TEXT,
	Sentence TEXT
);

CREATE TABLE giphyURL (
	ID SERIAL PRIMARY KEY,
	Url TEXT
);

INSERT INTO author(name)
	VALUES
    ('Player 1'),
    ('Player 2'),
    ('Player 3'),
    ('Player 4');

INSERT INTO caption(sentence)
	VALUES
    ('Pl 1'),
    ('Pl 2'),
    ('Pl 3'),
    ('Pl 4');

/*
INSERT INTO quote (name, sentence)
SELECT a.name, c.sentence
FROM author a
LEFT JOIN caption c ON c.id = a.id;
*/