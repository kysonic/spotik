-- migrate:up
CREATE TABLE likes(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE
)

-- migrate:down
DROP TABLE likes;

