-- migrate:up
ALTER TABLE artists
ADD COLUMN cover VARCHAR(200);

ALTER TABLE albums
ADD COLUMN cover VARCHAR(200);

ALTER TABLE songs
ADD COLUMN cover VARCHAR(200);

-- migrate:down
ALTER TABLE artists DROP COLUMN cover;
ALTER TABLE albums DROP COLUMN cover;
ALTER TABLE songs DROP COLUMN cover;
