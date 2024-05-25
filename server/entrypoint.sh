#!/bin/bash
# entrypoint.sh

echo "Checking configurations..."
# Add pre-run checks or configuration setups here

echo "Starting application..."
exec "$@"
