-- Habit patterns table
CREATE TABLE habit_patterns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(255),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    habit_strength FLOAT,
    repeat_frequency INTEGER,
    last_purchase_date TIMESTAMP,
    habit_disruption_date TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_habit_patterns_user ON habit_patterns(user_id);
CREATE INDEX idx_habit_patterns_category ON habit_patterns(category_id);
CREATE INDEX idx_habit_patterns_last_purchase ON habit_patterns(last_purchase_date);
