-- Create email_subscriptions table for collecting emails
CREATE TABLE public.email_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  brand_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form)
CREATE POLICY "Anyone can subscribe via email" 
ON public.email_subscriptions 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading (admin only - no policy means no one can read except service role)
-- If you want to add admin access later, you can create additional policies

-- Create index on email for faster lookups
CREATE INDEX idx_email_subscriptions_email ON public.email_subscriptions(email);

-- Create index on created_at for sorting
CREATE INDEX idx_email_subscriptions_created_at ON public.email_subscriptions(created_at DESC);