-- Create database tables for LuminaX Resume Enhancer

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    original_text TEXT,
    parsed_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job descriptions table
CREATE TABLE IF NOT EXISTS job_descriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255),
    description TEXT NOT NULL,
    keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Resume analyses table
CREATE TABLE IF NOT EXISTS resume_analyses (
    id SERIAL PRIMARY KEY,
    resume_id INTEGER REFERENCES resumes(id),
    job_description_id INTEGER REFERENCES job_descriptions(id),
    match_score INTEGER,
    keywords_matched TEXT[],
    strengths TEXT[],
    gaps TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Templates table
CREATE TABLE IF NOT EXISTS templates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    template_data JSONB,
    category VARCHAR(100),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated resumes table
CREATE TABLE IF NOT EXISTS generated_resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    resume_id INTEGER REFERENCES resumes(id),
    template_id INTEGER REFERENCES templates(id),
    analysis_id INTEGER REFERENCES resume_analyses(id),
    generated_data JSONB,
    file_path VARCHAR(500),
    format VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default templates
INSERT INTO templates (name, description, template_data, category) VALUES
('Modern Tech', 'Clean, minimalist design perfect for tech roles', '{"color": "blue", "layout": "modern"}', 'technology'),
('Creative Professional', 'Bold design for creative and design positions', '{"color": "purple", "layout": "creative"}', 'creative'),
('Executive Elite', 'Sophisticated layout for senior positions', '{"color": "slate", "layout": "executive"}', 'executive'),
('Startup Dynamic', 'Energetic design for startup environments', '{"color": "orange", "layout": "startup"}', 'startup');
