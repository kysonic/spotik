-- migrate:up
ALTER TABLE likes 
ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- migrate:down
ALTER TABLE likes 
DROP COLUMN created_at;
