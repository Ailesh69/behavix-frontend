# Behavix Frontend

Landing page and dashboard for Behavix — AI-powered user behavior analytics platform.

## Features
- Animated landing page (Framer Motion)
- Company registration and login
- Analytics dashboard with real-time charts (Recharts)
- AI insights page
- Settings with API key management
- JWT auth with token expiry redirect
- Responsive design

## Tech Stack
- **Framework:** Next.js 16 + TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Charts:** Recharts
- **HTTP:** Axios
- **Deployment:** Vercel

## Setup

1. Clone the repo:
```bash
git clone https://github.com/Ailesh69/behavix-frontend.git
cd behavix-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

4. Start dev server:
```bash
npm run dev
```

Open `http://localhost:3000`

## Docker
```bash
docker build -t behavix-frontend .
docker run -p 3000:3000 behavix-frontend
```

## Pages
- `/` — Landing page
- `/register` — Company registration
- `/login` — Company login
- `/dashboard` — Analytics overview
- `/dashboard/insights` — AI insights
- `/dashboard/settings` — API key management

## License
MIT