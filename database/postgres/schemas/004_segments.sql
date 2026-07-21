-- User segments table
CREATE TABLE user_segments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    exploration_propensity exploration_propensity,
    category_preferences JSONB,
    engagement_level VARCHAR(50),
    frustration_themes JSONB,
    user_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_segments_propensity ON user_segments(exploration_propensity);
CREATE INDEX idx_segments_is_active ON user_segments(is_active);
