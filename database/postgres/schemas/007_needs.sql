-- Unmet needs table
CREATE TABLE unmet_needs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    description TEXT NOT NULL,
    category VARCHAR(100),
    frequency INTEGER DEFAULT 0,
    impact_score FLOAT,
    priority_score FLOAT,
    fulfillment_status fulfillment_status DEFAULT 'pending',
    source_review_id VARCHAR(255),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_needs_category ON unmet_needs(category);
CREATE INDEX idx_needs_priority ON unmet_needs(priority_score);
CREATE INDEX idx_needs_status ON unmet_needs(fulfillment_status);
CREATE INDEX idx_needs_frequency ON unmet_needs(frequency);
