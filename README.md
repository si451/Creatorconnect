# CreatorConnect

A platform for connecting brands with content creators and managing influencer marketing campaigns.

## Project Structure

```
CreatorConnect/
├── Frontend/           # Next.js frontend application
├── Backend/           # Backend services
│   ├── agents/       # Flask API for AI agents
│   ├── data/         # Mock data and data storage
│   └── scripts/      # Utility scripts
```

## Features

- Creator search and discovery
- Campaign proposal generation
- Contract management
- E-signature integration
- Payment processing
- AI-powered negotiation

## Tech Stack

### Frontend
- Next.js 13+
- TypeScript
- Tailwind CSS
- Shadcn UI
- Framer Motion

### Backend
- Express.js (Node.js)
- Flask (Python)
- Supabase
- Razorpay

## Setup Instructions

### Frontend Setup
1. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` file with required environment variables
4. Run development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   pip install -r agents/requirements.txt
   ```
4. Create `.env` file with required environment variables
5. Start Express server:
   ```bash
   npm start
   ```
6. Start Flask server:
   ```bash
   python agents/app.py
   ```

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_FLASK_API_URL=http://localhost:5000
```

### Backend (.env)
```
# Express
PORT=3000
NODE_ENV=development
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Flask
FLASK_ENV=development
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## Deployment

### Frontend (Vercel)
- Automatic deployment from main branch
- Environment variables configured in Vercel dashboard

### Backend (Render)
- Express API: creatorconnect-express-api.onrender.com
- Flask API: creatorconnect-flask-api.onrender.com
- Environment variables configured in Render dashboard

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License