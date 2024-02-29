-- migrate:up
ALTER TABLE playlists
ADD COLUMN description VARCHAR(200);

-- migrate:down
ALTER TABLE playlists
DROP COLUMN description;

