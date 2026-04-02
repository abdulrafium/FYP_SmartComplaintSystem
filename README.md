
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