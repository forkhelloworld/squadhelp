CREATE TABLE IF NOT EXISTS conversations (
  id serial PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS conversation_participants (
  chat_id int REFERENCES conversations ON DELETE CASCADE,
  user_id int REFERENCES "Users",
  is_blocked BOOLEAN DEFAULT FALSE,
  is_favorite BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (chat_id, user_id)
);

CREATE TABLE IF NOT EXISTS messages (
  conversation int REFERENCES conversations,
  sender int REFERENCES "Users",
  body TEXT NOT NULL CHECK (body != '')
);

CREATE TABLE IF NOT EXISTS catalogs (
  id serial PRIMARY KEY,
  user_id int REFERENCES "Users",
  name varchar(256) NOT NULL CHECK (catalogName != '')
);

CREATE TABLE IF NOT EXISTS catalogs_chats (
  id serial PRIMARY KEY,
  catalog_id int REFERENCES catalogs,
  chat_id int REFERENCES conversations
);