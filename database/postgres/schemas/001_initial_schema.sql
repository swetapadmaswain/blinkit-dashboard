-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE exploration_propensity AS ENUM ('high', 'medium', 'low');
CREATE TYPE barrier_type AS ENUM ('price', 'trust', 'information', 'convenience');
CREATE TYPE fulfillment_status AS ENUM ('pending', 'in_progress', 'fulfilled');
CREATE TYPE sync_status AS ENUM ('active', 'inactive', 'error');
CREATE TYPE job_status AS ENUM ('pending', 'running', 'completed', 'failed');
CREATE TYPE report_status AS ENUM ('pending', 'generating', 'completed', 'failed');
CREATE TYPE user_role AS ENUM ('admin', 'analyst', 'viewer');
