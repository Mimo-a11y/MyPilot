
-- ============================================
-- Chat Sessions
-- ============================================

CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    repository_id UUID NOT NULL,
    title VARCHAR(200) NOT NULL DEFAULT 'New chat',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_chat_sessions_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_chat_sessions_repository
        FOREIGN KEY (repository_id)
        REFERENCES repositories(id)
        ON DELETE CASCADE
);

-- Indexes for retrieving sessions by user and repository
CREATE INDEX idx_chat_sessions_user_id
    ON chat_sessions(user_id);

CREATE INDEX idx_chat_sessions_repository_id
    ON chat_sessions(repository_id);


-- ============================================
-- Chat Messages
-- ============================================

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY,
    session_id UUID NOT NULL,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    citations TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_chat_messages_role
        CHECK (role IN ('USER', 'ASSISTANT')),

    CONSTRAINT fk_chat_messages_session
        FOREIGN KEY (session_id)
        REFERENCES chat_sessions(id)
        ON DELETE CASCADE
);

-- Index for retrieving messages belonging to a session
CREATE INDEX idx_chat_messages_session_id
    ON chat_messages(session_id);

-- Index for retrieving messages in chronological order
CREATE INDEX idx_chat_messages_session_created_at
    ON chat_messages(session_id, created_at);
