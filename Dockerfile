FROM python:3.9-slim

# Create 'nginx' user and group
RUN addgroup --system nginx && adduser --system --no-create-home --ingroup nginx nginx

WORKDIR /app

# Copy and install dependencies
COPY ./backend /app/backend
COPY ./frontend /app/frontend
COPY ./requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

# Install Nginx
RUN apt-get update && \
    apt-get install -y nginx && \
    rm -rf /var/lib/apt/lists/*

# Setup Nginx for serving frontend
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/sites-enabled/default
COPY ./nginx/site.conf /etc/nginx/sites-available/
RUN ln -s /etc/nginx/sites-available/site.conf /etc/nginx/sites-enabled/

# Make port 80 available to the world outside this container
EXPOSE 80

# Copy startup script
COPY ./nginx/start.sh /start.sh
RUN chmod +x /start.sh

# Define environment variable
ENV NAME World

# Run start.sh when the container launches
CMD ["/start.sh"]
