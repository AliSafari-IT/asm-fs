#!/bin/bash
set -e

echo
echo "=== Adding Migration to Database ==="
echo

# Ensure script runs from project root
SCRIPT_DIR=$(dirname "$0")
cd "$SCRIPT_DIR/../../" || exit 1

# Prompt for migration name
read -p "Enter migration name: " MIGRATION_NAME
if [ -z "$MIGRATION_NAME" ]; then
  echo "Migration name cannot be empty."
  exit 1
fi

echo
echo "Adding migration: $MIGRATION_NAME"
echo

# Add migration
dotnet ef migrations add "$MIGRATION_NAME"  --verbose

# Update database
dotnet ef database update --verbose

echo
echo "Migration $MIGRATION_NAME added and database updated successfully."
echo

# Optional: Run the application
dotnet run
