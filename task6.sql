
CREATE TABLE IF NOT EXISTS messages (
    conversation int REFERENCES conversations,
    sender int REFERENCES "Users",
    body TEXT NOT NULL CHECK (body != '')
);

CREATE TABLE IF NOT EXISTS catalogs (
    userId int REFERENCES "Users",
    catalogName varchar(256) NOT NULL CHECK (catalogName != ''),
    chat int REFERENCES conversations
);