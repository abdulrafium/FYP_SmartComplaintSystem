#!/bin/bash

# Database backup script
# Usage: ./scripts/backup.sh [backup_name]

set -e

BACKUP_NAME=${1:-$(date +%Y%m%d_%H%M%S)}
BACKUP_DIR="./backups"
CONTAINER_NAME="smart-complaint-mongodb"

echo "🗄️  Creating database backup: $BACKUP_NAME"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Create MongoDB backup
echo "📦 Creating MongoDB dump..."
docker exec $CONTAINER_NAME mongodump \
    --host localhost \
    --port 27017 \
    --username admin \
    --password password123 \
    --authenticationDatabase admin \
    --db smart-complaint-system \
    --out /tmp/backup

# Copy backup from container to host
echo "📋 Copying backup files..."
docker cp $CONTAINER_NAME:/tmp/backup/smart-complaint-system $BACKUP_DIR/$BACKUP_NAME

# Create tar archive
echo "🗜️  Creating archive..."
cd $BACKUP_DIR
tar -czf "${BACKUP_NAME}.tar.gz" $BACKUP_NAME
rm -rf $BACKUP_NAME

# Clean up container
docker exec $CONTAINER_NAME rm -rf /tmp/backup

echo "✅ Backup created: $BACKUP_DIR/${BACKUP_NAME}.tar.gz"

# List all backups
echo ""
echo "📋 Available backups:"
ls -la $BACKUP_DIR/*.tar.gz 2>/dev/null || echo "No backups found"
