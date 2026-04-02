
# Smart Complaint System with AI-Enabled Automation

# Module 1

Smart Complaint System with AI-Enabled Automation focused on improving complaint submission, tracking, and role-based handling in an academic environment.

## Progress Status (April 2026)

The frontend MVP has been implemented and pushed to main.

### Completed So Far

- Public landing page with responsive design, animated sections, and clear user flow.
- Complaint submission flow with:
	- Role-based form fields (Student vs Staff/Faculty)
	- Client-side validation
	- University email verification flow (@iba-suk.edu.pk)
	- Success screen with generated tracking details and AI classification summary
- Complaint tracking module:
	- Track by ID from form route
- Role-based access flow (demo mode):
	- Admin login page and dashboard
	- Department login page and dashboard
	- Protected routes with local storage session check and expiry logic
- Basic dashboard management screens:
	- Admin tabs: complaints, departments, users
	- Department view: complaint filtering and status updates
- Shared navigation, footer, route guards, and 404 page.

## Current Demo Routes

- / (Landing page)
- /submit-complaint
- /track
- /track/:trackingId
- /login (API-based login page)
- /admin-login (dummy credentials)
- /department-login (dummy credentials)
- /admin (protected)
- /dashboard (protected)

## Demo Credentials (Currently Implemented)

These are hardcoded for frontend demo mode:

- Admin login:
	- Email: sscs.admin@iba-suk.edu.pk
	- Password: 12345
- Department login:
	- Email: sscs.library@iba-suk.edu.pk
	- Password: 12345
	- Department: Library

## Tech Stack in Use

- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Framer Motion
- React Hook Form
- Axios
- React Hot Toast
- Lucide Icons

## Project Structure (Current)

The active user-facing frontend is inside:

- FYP/frontend


## How To Run The Current Frontend

1. Open terminal in FYP/frontend
2. Install dependencies:

	 npm install

3. Start development server:

	 npm run dev

4. Open:

	 http://localhost:5173

Optional environment variable (frontend):

- VITE_API_URL=http://localhost:3000/api

If VITE_API_URL is not set, the frontend defaults to:

- http://localhost:3000/api

## API Endpoints Expected By Frontend

The current frontend calls backend endpoints such as:

- POST /verify-email
- POST /complaints
- GET /complaints/track/:trackingId
- POST /auth/login
- GET /complaints
- GET /departments
- GET /users
- GET /complaints/department
- PUT /complaints/:id/status

## Known Gaps / In Progress

- Backend and AI services are not fully represented in this workspace root at this stage.
- Admin/department auth in main role login pages is currently demo/hardcoded.
- Full production auth integration is pending.
- End-to-end integration, real notification flows, and full test coverage are still in progress.

## Next Milestones

- Integrate real backend auth and role permissions across all dashboards.
- Connect complete complaint lifecycle APIs (assignment, escalation, closure, audit trail).
- Integrate and validate AI classification/routing pipeline end-to-end.
- Add automated tests (unit + integration + UI flows).
- Prepare deployment-ready environment and operations documentation.

# Module 2

Module 2 focuses on backend implementation, API workflows, role-based access control, and AI-assisted complaint routing.

## Progress Status (April 2026)

The backend service has been implemented and pushed with core complaint lifecycle APIs.

### Completed So Far

- Node.js + Express backend in `FYP/backend` with MongoDB (Mongoose) integration.
- Security and platform middleware:
	- Helmet, CORS, request rate limiting, and body size controls.
	- JWT authentication middleware and role-based permission (RBAC) middleware.
- Complaint lifecycle APIs:
	- Public complaint submission with details
	- Email validation and university email domain checks (@iba-suk.edu.pk).
	- Tracking endpoint by complaint tracking ID.
	- Role-user complaint inbox and complaint status update workflow.
- Notification and verification:
	- Email verification endpoint using AbstractAPI.
	- SMTP email notification service and HTML complaint confirmation template.
- Seed and test scaffolding:
	- Database seed scripts for departments, roles, users, and sample complaints.
	- Jest + Supertest backend test files for auth and complaint routes.

## Backend Project Structure (Current)

- `FYP/backend/src` (API source)
- `FYP/backend/src/routes` (auth, complaints, departments, admin, verify-email, track)
- `FYP/backend/src/models` (Complaint, Department, Role, User)
- `FYP/backend/src/middleware` (auth, RBAC)
- `FYP/backend/src/templates` (email templates)
- `FYP/backend/seed` (database initialization and sample data)
- `FYP/backend/tests` (API test files)

## How To Run The Backend

1. Open terminal in `FYP/backend`
2. Install dependencies:

	 npm install

3. Add required environment variables in `FYP/.env`
4. Start development server:

	 npm run dev

5. Backend runs at:

	 http://localhost:3000

Optional commands:

- `npm run seed`
- `npm test`

## Backend Environment Variables

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `AI_SERVICE_URL`
- `ABSTRACTAPI_KEY`

## Implemented Backend API Base Paths

- `/api/auth`
- `/api/complaints`
- `/api/departments`
- `/api/admin`
- `/api/verify-email`
- `/health`

## Known Gaps / In Progress (Module 2)

- Full end-to-end alignment between frontend route contracts and backend payloads is still being finalized.
- AI model training, evaluation, and routing/prompt tuning are currently in progress.
- Some backend test files reflect older payload assumptions and need schema-aligned updates.
- AI service deployment readiness and operational monitoring are in progress.