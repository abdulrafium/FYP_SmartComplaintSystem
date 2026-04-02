#!/bin/bash

# Smart Complaint System Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up Smart Complaint System..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file. Please edit it with your configuration."
else
    echo "✅ .env file already exists."
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p backend/uploads/complaints
mkdir -p backend/logs
mkdir -p ai-service/models
mkdir -p ai-service/rag_index

# Set permissions
echo "🔐 Setting permissions..."
chmod +x scripts/*.sh

# Build Docker images
echo "🏗️  Building Docker images..."
docker-compose build

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service health
echo "🏥 Checking service health..."
for i in {1..10}; do
    if curl -f http://localhost:3000/health > /dev/null 2>&1; then
        echo "✅ Backend is healthy"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "❌ Backend health check failed"
        exit 1
    fi
    sleep 5
done

for i in {1..10}; do
    if curl -f http://localhost:8000/health > /dev/null 2>&1; then
        echo "✅ AI Service is healthy"
        break
    fi
    if [ $i -eq 10 ]; then
        echo "❌ AI Service health check failed"
        exit 1
    fi
    sleep 5
done

# Seed database
echo "🌱 Seeding database..."
docker-compose exec -T backend npm run seed

# Build AI index
echo "🤖 Building AI knowledge base index..."
curl -X POST http://localhost:8000/build-index -H "Content-Type: application/json" -d '{"rebuild": true}'

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📱 Access the application:"
echo "  Frontend: http://localhost:5173"
echo "  Backend API: http://localhost:3000"
echo "  AI Service: http://localhost:8000"
echo ""
echo "👤 Admin credentials:"
echo "  Email: admin@iba-suk.edu.pk"
echo "  Password: admin123"
echo ""
echo "📚 Useful commands:"
echo "  make logs     - View application logs"
echo "  make down     - Stop all services"
echo "  make clean    - Clean up containers and volumes"
echo "  make help     - View all available commands"
echo ""
echo "🔧 Next steps:"
echo "1. Edit .env file with your SMTP and API keys"
echo "2. Test the complaint submission form"
echo "3. Check the admin dashboard"
echo ""
