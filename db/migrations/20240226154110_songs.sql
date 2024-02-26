-- migrate:up
CREATE TABLE songs(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  length INTEGER,
  plays_count INTEGER DEFAULT 0,
  genres VARCHAR(100)[],

  album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE songs;
