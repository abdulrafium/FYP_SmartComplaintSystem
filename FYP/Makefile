# Smart Complaint System - Development Commands

.PHONY: help build up down logs clean seed test lint format

# Default target
help:
	@echo "Smart Complaint System - Available Commands:"
	@echo ""
	@echo "  make build     - Build all Docker images"
	@echo "  make up        - Start all services"
	@echo "  make down      - Stop all services"
	@echo "  make logs      - View logs from all services"
	@echo "  make clean     - Clean up containers and volumes"
	@echo "  make seed      - Seed the database with sample data"
	@echo "  make test      - Run tests for all services"
	@echo "  make lint      - Run linting for all services"
	@echo "  make format    - Format code for all services"
	@echo ""
	@echo "Development Commands:"
	@echo "  make dev-up    - Start development environment"
	@echo "  make dev-down  - Stop development environment"
	@echo "  make dev-logs  - View development logs"
	@echo ""
	@echo "Individual Service Commands:"
	@echo "  make backend-logs    - View backend logs"
	@echo "  make frontend-logs   - View frontend logs"
	@echo "  make ai-logs         - View AI service logs"
	@echo "  make db-logs         - View database logs"

# Production commands
build:
	@echo "Building Docker images..."
	docker-compose build

up:
	@echo "Starting services..."
	docker-compose up -d
	@echo "Services started. Access the application at http://localhost:5173"

down:
	@echo "Stopping services..."
	docker-compose down

logs:
	@echo "Viewing logs..."
	docker-compose logs -f

clean:
	@echo "Cleaning up..."
	docker-compose down -v --remove-orphans
	docker system prune -f

# Development commands
dev-up:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development environment started."
	@echo "Frontend: http://localhost:5173"
	@echo "Backend API: http://localhost:3000"
	@echo "AI Service: http://localhost:8000"
	@echo "MongoDB Express: http://localhost:8081"
	@echo "Redis Commander: http://localhost:8082"

dev-down:
	@echo "Stopping development environment..."
	docker-compose -f docker-compose.dev.yml down

dev-logs:
	@echo "Viewing development logs..."
	docker-compose -f docker-compose.dev.yml logs -f

# Individual service logs
backend-logs:
	docker-compose logs -f backend

frontend-logs:
	docker-compose logs -f frontend

ai-logs:
	docker-compose logs -f ai-service

db-logs:
	docker-compose logs -f mongodb

# Database operations
seed:
	@echo "Seeding database..."
	docker-compose exec backend npm run seed
	@echo "Database seeded successfully!"

backup-db:
	@echo "Creating database backup..."
	docker-compose exec mongodb mongodump --host localhost --port 27017 --username admin --password password123 --authenticationDatabase admin --db smart-complaint-system --out /data/backup
	@echo "Backup created in MongoDB container at /data/backup"

restore-db:
	@echo "Restoring database from backup..."
	docker-compose exec mongodb mongorestore --host localhost --port 27017 --username admin --password password123 --authenticationDatabase admin --db smart-complaint-system /data/backup/smart-complaint-system
	@echo "Database restored successfully!"

# Testing commands
test:
	@echo "Running tests..."
	docker-compose exec backend npm test
	docker-compose exec ai-service python -m pytest tests/
	@echo "All tests completed!"

test-backend:
	@echo "Running backend tests..."
	docker-compose exec backend npm test

test-ai:
	@echo "Running AI service tests..."
	docker-compose exec ai-service python -m pytest tests/ -v

# Code quality commands
lint:
	@echo "Running linting..."
	docker-compose exec backend npm run lint
	docker-compose exec frontend npm run lint
	@echo "Linting completed!"

format:
	@echo "Formatting code..."
	docker-compose exec backend npm run format
	docker-compose exec frontend npm run format
	@echo "Code formatting completed!"

# Health checks
health:
	@echo "Checking service health..."
	@curl -f http://localhost:3000/health || echo "Backend: UNHEALTHY"
	@curl -f http://localhost:8000/health || echo "AI Service: UNHEALTHY"
	@curl -f http://localhost:5173 || echo "Frontend: UNHEALTHY"

# Setup commands
setup:
	@echo "Setting up the project..."
	@if [ ! -f .env ]; then cp .env.example .env; echo "Created .env file from .env.example"; fi
	@echo "Please edit .env file with your configuration before running 'make up'"

install:
	@echo "Installing dependencies..."
	cd backend && npm install
	cd frontend && npm install
	cd ai-service && pip install -r requirements.txt
	@echo "Dependencies installed!"

# Monitoring commands
stats:
	@echo "Docker container stats:"
	docker stats --no-stream

ps:
	@echo "Running containers:"
	docker-compose ps

# Quick start command
quick-start: setup build up seed
	@echo ""
	@echo "🎉 Smart Complaint System is ready!"
	@echo ""
	@echo "Access the application:"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Backend API: http://localhost:3000"
	@echo "  AI Service: http://localhost:8000"
	@echo ""
	@echo "Admin credentials:"
	@echo "  Email: admin@iba-suk.edu.pk"
	@echo "  Password: admin123"
	@echo ""
	@echo "Use 'make logs' to view application logs"
	@echo "Use 'make down' to stop all services"
