#!/bin/bash

# Database restore script
# Usage: ./scripts/restore.sh backup_name.tar.gz

set -e

if [ $# -eq 0 ]; then
    echo "❌ Usage: $0 <backup_file.tar.gz>"
    echo ""
    echo "Available backups:"
    ls -la ./backups/*.tar.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE=$1
BACKUP_DIR="./backups"
CONTAINER_NAME="smart-complaint-mongodb"

if [ ! -f "$BACKUP_DIR/$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_DIR/$BACKUP_FILE"
    exit 1
fi

echo "🔄 Restoring database from: $BACKUP_FILE"

# Extract backup
echo "📦 Extracting backup..."
cd $BACKUP_DIR
tar -xzf $BACKUP_FILE

BACKUP_NAME=$(basename $BACKUP_FILE .tar.gz)

# Copy backup to container
echo "📋 Copying backup to container..."
docker cp $BACKUP_NAME $CONTAINER_NAME:/tmp/restore

# Restore database
echo "🗄️  Restoring MongoDB..."
docker exec $CONTAINER_NAME mongorestore \
    --host localhost \
    --port 27017 \
    --username admin \
    --password password123 \
    --authenticationDatabase admin \
    --db smart-complaint-system \
    --drop \
    /tmp/restore

# Clean up
docker exec $CONTAINER_NAME rm -rf /tmp/restore
rm -rf $BACKUP_NAME

echo "✅ Database restored successfully from $BACKUP_FILE"
