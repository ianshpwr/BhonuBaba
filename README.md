# BhonuBaba (Advanced Enterprise Edition)

A visually stunning, full-stack e-commerce platform modernized with strict testing, linting, and continuous delivery workflows.

## Tech Stack
- **Frontend**: Next.js App Router, Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose
- **Auth**: JWT Authentication

## Advanced DevOps Additions
- **Unit Testing**: Jest & React Testing Library integration.
- **Integration Testing**: Supertest utilized on a distinct MongoDB Test Cluster.
- **E2E Testing**: Cypress workflows configured for checkout pipelines.
- **Linting Hooks**: Prettier & ESLint enforcement explicitly managed.
- **CI/CD**: GitHub Actions seamlessly executing dependencies, tests, and EC2 remote deployments via `appleboy/ssh-action`.
- **Dependabot**: Autonomous weekly npm dependency vulnerability lifecycle operations.

## Project Structure
- `/client` - Next.js frontend application, includes `/__tests__/` and `/cypress/e2e/`.
- `/server` - Express backend API, includes `/tests/unit/` and `/tests/integration/`.

## Setup Instructions

### 1. Backend Setup
1. Navigate to the server folder: `cd server`
2. Install dependencies: `npm install`
3. Environment secrets: Add `TEST_MONGO_URI` to `.env` to execute Supertest integrations securely.
4. Execute `npm run lint` & `npm run format` for structure sanitization.
5. Standard Execution: `npm run dev`

### 2. Frontend Setup
1. Navigate to the client folder: `cd client`
2. Install dependencies: `npm install`
3. Local Tests: `npm run test` (Jest) & `npm run cypress:open` (E2E workflows)
4. Start the Application: `npm run dev` (Runs on `http://localhost:3000`)

Enjoy the heavily protected, aesthetic shopping experience! 🍑
