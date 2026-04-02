#!/bin/bash

# Production deployment script
# Usage: ./scripts/deploy.sh [environment]

set -e

ENVIRONMENT=${1:-production}
echo "🚀 Deploying to $ENVIRONMENT environment..."

# Validate environment
if [ "$ENVIRONMENT" != "production" ] && [ "$ENVIRONMENT" != "staging" ]; then
    echo "❌ Invalid environment. Use 'production' or 'staging'"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it from .env.example"
    exit 1
fi

# Validate required environment variables
echo "🔍 Validating environment variables..."
required_vars=("MONGODB_URI" "JWT_SECRET" "SMTP_USER" "SMTP_PASS")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo "❌ Required environment variable $var is not set"
        exit 1
    fi
done

# Create backup before deployment
echo "🗄️  Creating pre-deployment backup..."
./scripts/backup.sh "pre-deploy-$(date +%Y%m%d_%H%M%S)"

# Pull latest images
echo "📥 Pulling latest images..."
docker-compose pull

# Build images
echo "🏗️  Building images..."
docker-compose build --no-cache

# Stop existing services
echo "🛑 Stopping existing services..."
docker-compose down

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 60

# Health checks
echo "🏥 Performing health checks..."
for service in "backend:3000" "ai-service:8000"; do
    IFS=':' read -r name port <<< "$service"
    for i in {1..10}; do
        if curl -f http://localhost:$port/health > /dev/null 2>&1; then
            echo "✅ $name is healthy"
            break
        fi
        if [ $i -eq 10 ]; then
            echo "❌ $name health check failed"
            exit 1
        fi
        sleep 10
    done
done

# Run database migrations if needed
echo "🗄️  Running database migrations..."
# Add migration commands here if needed

# Build AI index
echo "🤖 Building AI knowledge base index..."
curl -X POST http://localhost:8000/build-index \
    -H "Content-Type: application/json" \
    -d '{"rebuild": false}' || echo "⚠️  AI index build failed, continuing..."

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Application URLs:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:3000"
echo "  AI Service: http://localhost:8000"
echo ""
echo "📊 Monitor the application:"
echo "  docker-compose logs -f"
echo "  docker-compose ps"
echo ""
