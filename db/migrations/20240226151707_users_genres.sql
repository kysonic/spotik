-- migrate:up
ALTER TABLE users 
ADD COLUMN genres VARCHAR(100)[];

-- migrate:down
ALTER TABLE users
DROP COLUMN genres;
