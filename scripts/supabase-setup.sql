-- Enable RLS (Row Level Security)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE,
    updated_at TIMESTAMP WITH TIME ZONE,
    full_name TEXT,
    avatar_url TEXT,
    PRIMARY KEY (id)
);

-- Create resumes table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    filename TEXT,
    file_path TEXT,
    original_text TEXT,
    parsed_data JSONB,
    template_id TEXT,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create job_descriptions table
CREATE TABLE IF NOT EXISTS public.job_descriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT,
    company TEXT,
    description TEXT NOT NULL,
    keywords TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resume_analyses table
CREATE TABLE IF NOT EXISTS public.resume_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
    job_description_id UUID REFERENCES public.job_descriptions(id) ON DELETE CASCADE,
    match_score INTEGER,
    keywords_matched TEXT[],
    strengths TEXT[],
    gaps TEXT[],
    recommendations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create generated_resumes table
CREATE TABLE IF NOT EXISTS public.generated_resumes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE,
    template_id TEXT,
    generated_data JSONB,
    file_path TEXT,
    format TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Resumes policies
CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes FOR DELETE USING (auth.uid() = user_id);

-- Job descriptions policies
CREATE POLICY "Users can view own job descriptions" ON job_descriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own job descriptions" ON job_descriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own job descriptions" ON job_descriptions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own job descriptions" ON job_descriptions FOR DELETE USING (auth.uid() = user_id);

-- Resume analyses policies
CREATE POLICY "Users can view own resume analyses" ON resume_analyses FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM resumes 
        WHERE resumes.id = resume_analyses.resume_id 
        AND resumes.user_id = auth.uid()
    )
);

-- Generated resumes policies
CREATE POLICY "Users can view own generated resumes" ON generated_resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own generated resumes" ON generated_resumes FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_descriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resume_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_resumes ENABLE ROW LEVEL SECURITY;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS resumes_user_id_idx ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS resumes_created_at_idx ON public.resumes(created_at DESC);
CREATE INDEX IF NOT EXISTS job_descriptions_user_id_idx ON public.job_descriptions(user_id);
CREATE INDEX IF NOT EXISTS resume_analyses_resume_id_idx ON public.resume_analyses(resume_id);
CREATE INDEX IF NOT EXISTS generated_resumes_user_id_idx ON public.generated_resumes(user_id);
