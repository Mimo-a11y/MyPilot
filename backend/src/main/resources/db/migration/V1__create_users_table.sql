
CREATE TABLE users (
    id UUID PRIMARY KEY,

    github_id BIGINT NOT NULL UNIQUE,

    github_username VARCHAR(255) NOT NULL UNIQUE,

    display_name VARCHAR(200) NOT NULL,

    avatar_url VARCHAR(500),

    access_token TEXT NOT NULL,

    token_scope VARCHAR(500),

    created_at TIMESTAMP WITH TIME ZONE
);
