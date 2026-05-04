# BhonuBaba

BhonuBaba is a full-stack e-commerce application with a Next.js frontend and an Express/MongoDB backend. This repository now includes the DevOps deliverables required by the rubric:

- Automated unit and integration testing with report artifacts.
- Terraform-based AWS infrastructure provisioning.
- Docker image build and push to Amazon ECR.
- Deployment to Amazon ECS Fargate.
- Dependabot for weekly npm updates.

## Stack

- Frontend: Next.js App Router, React, TypeScript
- Backend: Express, TypeScript, Mongoose, JWT
- Testing: Jest, React Testing Library, Supertest, Cypress
- Infrastructure: Terraform, AWS S3, ECR, ECS Fargate, ALB, CloudWatch

## Local Development

### Backend

1. `cd server`
2. Install dependencies with `npm install`
3. Configure `server/.env` with:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`
4. Run `npm run dev`

### Frontend

1. `cd client`
2. Install dependencies with `npm install`
3. Configure `client/.env.local` with:
   - `NEXT_PUBLIC_API_URL`
4. Run `npm run dev`

## Test Commands

### Backend

- `npm test`
- `npm run test:report`
- `npm run test:integration`

Notes:

- Integration tests require `TEST_MONGO_URI`.
- In GitHub Actions, MongoDB is provided automatically as a service container.
- Locally, integration tests are skipped unless `TEST_MONGO_URI` is set.

### Frontend

- `npm test`
- `npm run test:report`
- `npm run lint`
- `npm run build`

## Docker

Both app containers now use multi-stage builds. The backend image also satisfies the rubric requirements:

- Multi-stage Dockerfile
- Non-root runtime user
- Healthcheck against `/health`

## Terraform

Terraform lives in [`infra/terraform`](./infra/terraform) and provisions:

- An S3 bucket with:
  - Unique name
  - Versioning enabled
  - Server-side encryption enabled
  - Public access blocked
- An Amazon ECR repository for the backend image
- A VPC with two public subnets
- An Application Load Balancer
- An ECS cluster for Fargate
- IAM roles for ECS task execution
- CloudWatch logging resources

## GitHub Actions Pipeline

The workflow in `.github/workflows/ci.yml` follows the rubric order:

1. Push or pull request triggers the workflow
2. Backend and frontend tests run
3. Test reports are generated and uploaded as artifacts
4. Terraform initializes, validates, plans, and applies on pushes
5. Docker image is built and pushed to ECR
6. ECS Fargate service is created or updated
7. The deployment waits for service stability and verifies `/health`

## Required GitHub Secrets

### Rubric-required AWS secrets

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN`
- `AWS_REGION`

### Runtime secrets required for ECS deployment

- `APP_MONGO_URI`
- `APP_JWT_SECRET`

The deployment workflow syncs the runtime secrets into AWS Systems Manager Parameter Store before updating ECS.

## Dependabot

Dependabot is configured in `.github/dependabot.yml` for weekly npm updates in both `client` and `server`.
