import { createClient } from '@supabase/supabase-js';

const URL = 'https://uwsmxpmzfimasysqmesv.supabase.co'

const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3c214cG16ZmltYXN5c3FtZXN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5NDY5OTIsImV4cCI6MjAyODUyMjk5Mn0.d9TL7uSxSm43rHWpu2eDCBpVmIr3aehfxW5Dd2mYxGc';

export const supabase = createClient(URL, API_KEY);