# Use an official Node.js runtime as the base image
FROM node:20.12.2

# Create and change to the app directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application on port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
