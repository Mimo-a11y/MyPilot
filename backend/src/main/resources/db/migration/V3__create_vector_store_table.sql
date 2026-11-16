-- Required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table used by Spring AI PgVectorStore
CREATE TABLE IF NOT EXISTS vector_store (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT,
    metadata JSON,
    embedding VECTOR(768)
);

-- HNSW index for cosine similarity search
CREATE INDEX IF NOT EXISTS vector_store_embedding_idx
ON vector_store
USING HNSW (embedding vector_cosine_ops);