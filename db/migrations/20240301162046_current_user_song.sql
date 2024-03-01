-- migrate:up
ALTER TABLE users 
ADD COLUMN current_song_id INTEGER REFERENCES songs(id);

-- migrate:down
ALTER TABLE users 
DROP COLUMN current_song_id;

