-- migrate:up
CREATE TABLE albums(
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  release_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE albums;
