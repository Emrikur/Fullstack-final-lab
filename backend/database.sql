DROP TABLE IF EXISTS accounts;

DROP TABLE IF EXISTS tokens;

DROP TABLE IF EXISTS dreams;
DROP TABLE IF EXISTS broadcasts;

CREATE TABLE
  accounts (
    id INTEGER PRIMARY KEY UNIQUE,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    security_answer TEXT NOT NULL,
    zodiac TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT 0,
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
  broadcasts (
    admin_id INTEGER,
    feature TEXT NOT NULL,
    optimization TEXT NOT NULL,
    upcoming TEXT NOT NULL,
    FOREIGN KEY (admin_id) REFERENCES accounts (id)
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
  broadcasts (admin_id, feature, optimization, upcoming)
VALUES
  (
    1,
    'Introducing the news tab! Here we will give you the latest news about the app and what is to come!',
    'Optimized the way news are displayed',
    'Next up we will be working on a horoscope-feature page'
  );

INSERT INTO
  accounts (name, surname, email, password, security_answer, zodiac, is_admin)
VALUES
  (
    'Joakim',
    'Erlandsson',
    'joakim@dlore.com',
    'mypassword',
    'pilot',
    'Aries',
    1
  );
INSERT INTO
  accounts (name, surname, email, password, security_answer, zodiac, is_admin)
VALUES
  (
    'Vanja',
    'Ferhatovic',
    'vanja@dlore.com',
    '123456',
    'security',
    'Taurus',
    1
  );

INSERT INTO
  tokens (account_id, token)
VALUES
  (1, '1088b7ec-912c-48cc-b117-bf4e0e4a9a35');
INSERT INTO
  tokens (account_id, token)
VALUES
  (2, '9791aa08-ad86-488a-a8d4-053090a6bc8c');
