#!/bin/sh

# Replace environment variables in the template and move it to the nginx config location
envsubst < /etc/nginx/nginx.conf.$DEPLOYMENT.template > /etc/nginx/nginx.conf

# Start nginx
nginx -g 'daemon off;'
