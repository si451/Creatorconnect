# CreatorConnect Backend

This is the backend application for CreatorConnect, built with Node.js, Express, and Supabase.

## Project Structure

- `supabase/` - Supabase configuration and functions
- `agents/` - Backend agents
- `lib/` - Backend utilities
- `scripts/` - Backend scripts

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file with the following variables:
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

3. Run the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server 