# consultancy-project

## AI chatbot setup (Groq)

Backend uses Groq through `POST /api/chat/ask`.

Add these environment variables in `backend/.env` (and in Render backend service settings):

- `GROQ_API_KEY=your_groq_api_key`
- `GROQ_MODEL=llama-3.1-8b-instant` (optional, default already set)

Recommended free model for agriculture Q&A:

- `llama-3.1-8b-instant` (fast and reliable on free tier)

## Enable Google sign-in on Sign In page

Google sign-in is implemented in both frontend and backend. To enable `Continue with Google`:

1. Create env files from examples:
	- copy `frontend/.env.example` to `frontend/.env`
	- copy `backend/.env.example` to `backend/.env`
2. Set the same Google Web Client ID in both files:
	- `frontend/.env`: `VITE_GOOGLE_CLIENT_ID=...`
	- `backend/.env`: `GOOGLE_CLIENT_ID=...`
3. Make sure frontend API URL points to backend:
	- `frontend/.env`: `VITE_API_URL=http://localhost:5000`
4. Restart both apps after env changes.

Notes:
- Google sign-in is for `User` role only. `Admin` role uses fixed admin credentials.
- Backend route used by Google sign-in: `POST /api/auth/google`.