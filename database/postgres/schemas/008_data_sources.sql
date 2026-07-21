-- Data sources table
CREATE TABLE data_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    api_endpoint VARCHAR(500),
    last_synced_at TIMESTAMP,
    sync_status sync_status DEFAULT 'active',
    config JSONB,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_data_sources_type ON data_sources(type);
CREATE INDEX idx_data_sources_status ON data_sources(sync_status);
CREATE INDEX idx_data_sources_last_synced ON data_sources(last_synced_at);
