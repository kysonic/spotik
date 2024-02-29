-- migrate:up
ALTER TABLE likes
ADD CONSTRAINT unique_like UNIQUE (user_id, song_id);

-- migrate:down
ALTER TABLE likes 
DROP CONSTRAINT unique_like;

