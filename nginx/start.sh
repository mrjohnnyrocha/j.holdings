#!/bin/bash

# Ensure you are in the right directory
cd "$(dirname "$0")/../" || exit

# Check Nginx configuration and start Nginx
nginx -t && nginx

# Navigate to the app directory and start the FastAPI application
cd app || exit
uvicorn app:app --host 0.0.0.0 --port 8000
