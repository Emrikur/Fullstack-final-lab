DROP TABLE IF EXISTS accounts;

DROP TABLE IF EXISTS tokens;

DROP TABLE IF EXISTS dreams;

CREATE TABLE
  accounts (
    id INTEGER PRIMARY KEY UNIQUE,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    security_answer TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_DATE,
    updated_at TEXT DEFAULT CURRENT_DATE,
    CHECK (email LIKE '%_@__%.__%')
    CHECK (LENGTH (password) >= 6)
    CHECK (LENGTH (security_answer) >= 1)
  );

CREATE TABLE
  tokens (
    account_id INTEGER,
    token TEXT NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts (id)
  );

CREATE TABLE
  dreams (
    dream_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    tag TEXT,
    created_at TEXT DEFAULT CURRENT_DATE,
    FOREIGN KEY (account_id) REFERENCES accounts (id)
  );

INSERT INTO
  dreams (account_id, title, text, tag)
VALUES
  (
    1,
    'Min första post',
    'Älskade verkligen att jobba på mitt projekt',
    'surreal'
  );

INSERT INTO
  accounts (name, surname, email, password, security_answer)
VALUES
  (
    'Joakim',
    'Erlandsson',
    'joakim@slb.se',
    'mypassword',
    'pilot'
  );

INSERT INTO
  tokens (account_id, token)
VALUES
  (1, '1088b7ec-912c-48cc-b117-bf4e0e4a9a35');

INSERT INTO
  accounts (name, surname, email, password, security_answer)
VALUES
  (
    'Mikael',
    'Persson',
    'mikael@slb.se',
    'tyrannen',
    'gamer'
  );

INSERT INTO
  tokens (account_id, token)
VALUES
  (2, '6f17e697-fbd3-4067-92c7-ab2c17b29499');

INSERT INTO
  accounts (name, surname, email, password, security_answer)
VALUES
  (
    'Eric',
    'Karlsson',
    'eric@slb.se',
    'kingafro',
    'dungeon master'
  );

INSERT INTO
  tokens (account_id, token)
VALUES
  (3, 'a869be19-2439-4126-8117-fd9cf6ebce7c');

INSERT INTO
  accounts (name, surname, email, password, security_answer)
VALUES
  (
    'Patrik',
    'Lundell',
    'patrik@slb.se',
    'mrmcevil',
    'designer'
  );

INSERT INTO
  tokens (account_id, token)
VALUES
  (4, 'fe60f688-dd1c-4d01-9093-87caea60176d');
