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
    created_at TEXT DEFAULT CURRENT_DATE,
    updated_at TEXT DEFAULT CURRENT_DATE CHECK (email LIKE '%_@__%.__%') CHECK (LENGTH (password) >= 6)
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
    account_id INTEGER,
    text TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_DATE,
    FOREIGN KEY (account_id) REFERENCES accounts (id)
  );

INSERT INTO
  accounts (name, surname, email, password)
VALUES
  (
    'Joakim',
    'Erlandsson',
    'Joakim@SLB.se',
    'mypassword'
  );

  INSERT INTO tokens (account_id, token) VALUES (1, '1088b7ec-912c-48cc-b117-bf4e0e4a9a35');


INSERT INTO
  accounts (name, surname, email, password)
VALUES
  (
    'Mikael',
    'Persson',
    'Mikael@SLB.se',
    'tyrannen'
  );

  INSERT INTO tokens (account_id, token) VALUES (2, '6f17e697-fbd3-4067-92c7-ab2c17b29499');

INSERT INTO
  accounts (name, surname, email, password)
VALUES
  (
    'Eric',
    'Karlsson',
    'Eric@SLB.se',
    'kingafro'
  );

  INSERT INTO tokens (account_id, token) VALUES (3, 'a869be19-2439-4126-8117-fd9cf6ebce7c');

INSERT INTO
  accounts (name, surname, email, password)
VALUES
  (
    'Patrik',
    'Lundell',
    'Patrik@SLB.se',
    'mrmcevil'
  );

  INSERT INTO tokens (account_id, token) VALUES (4, 'fe60f688-dd1c-4d01-9093-87caea60176d');

INSERT INTO
  dreams (account_id, text)
VALUES
  (1, 'Idag hade jag en riktigt härlig dag i solen!');

INSERT INTO
  dreams (account_id, text)
VALUES
  (1, 'Gött med pizza i Italien');
