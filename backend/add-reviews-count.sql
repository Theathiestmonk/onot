-- Add reviews_count column to attractions table
ALTER TABLE attractions 
ADD COLUMN IF NOT EXISTS reviews_count INTEGER DEFAULT 0 CHECK (reviews_count >= 0);

