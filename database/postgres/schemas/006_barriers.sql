-- Barriers table
CREATE TABLE barriers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type barrier_type NOT NULL,
    description TEXT,
    severity_score FLOAT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    platform VARCHAR(100),
    source_review_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_barriers_type ON barriers(type);
CREATE INDEX idx_barriers_category ON barriers(category_id);
CREATE INDEX idx_barriers_platform ON barriers(platform);
CREATE INDEX idx_barriers_severity ON barriers(severity_score);
