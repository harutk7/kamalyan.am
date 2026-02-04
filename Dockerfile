# Kamalyan Consulting Website - Dockerfile
# Multi-stage build for production

# Stage 1: Build stage (if needed for npm packages)
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Stage 2: Production stage with Nginx
FROM nginx:alpine

# Install Node.js for running tests (optional)
RUN apk add --no-cache nodejs npm

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy website files to nginx html directory
COPY website/ /usr/share/nginx/html/

# Copy assets
COPY assets/ /usr/share/nginx/html/assets/

# Create a simple health check page
RUN echo '<!DOCTYPE html><html><body>OK</body></html>' > /usr/share/nginx/html/health

# Expose port 80
EXPOSE 80

# Add labels
LABEL maintainer="Kamalyan Consulting"
LABEL description="Kamalyan Consulting Website"
LABEL version="1.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
