# Kamalyan Consulting - Docker Setup

Docker configuration for deploying the Kamalyan Consulting website.

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Start the website
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the website
docker-compose down
```

The website will be available at: **http://localhost:9999**

---

## Docker Commands

### Build Image
```bash
docker build -t kamalyan-website .
```

### Run Container
```bash
docker run -d -p 9999:80 --name kamalyan-website kamalyan-website
```

### Stop Container
```bash
docker stop kamalyan-website
docker rm kamalyan-website
```

---

## Development Mode

For development with hot-reload:

```bash
docker-compose -f docker-compose.dev.yml up -d
```

---

## Production Deployment

### 1. Build and Push to Registry

```bash
# Build for production
docker build -t your-registry/kamalyan-website:latest .

# Push to registry
docker push your-registry/kamalyan-website:latest
```

### 2. Deploy on Server

```bash
# Pull and run
docker pull your-registry/kamalyan-website:latest
docker run -d \
  -p 80:80 \
  --name kamalyan-website \
  --restart unless-stopped \
  your-registry/kamalyan-website:latest
```

---

## Docker Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Production build with Nginx |
| `Dockerfile.dev` | Development build with Node.js |
| `docker-compose.yml` | Production orchestration |
| `docker-compose.dev.yml` | Development orchestration |
| `nginx.conf` | Nginx configuration |
| `.dockerignore` | Files to exclude from build |

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NGINX_HOST` | `localhost` | Server host |
| `NGINX_PORT` | `80` | Server port |

### Ports

| Port | Service | Description |
|------|---------|-------------|
| `9999` | Website | Mapped to container port 80 |

---

## Health Checks

The container includes health checks:
- **HTTP**: `http://localhost/health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds

---

## Security Features

- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Gzip compression enabled
- Static asset caching (1 year)
- Hidden file protection

---

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs kamalyan-website

# Check container status
docker ps -a
```

### Port already in use
```bash
# Change port in docker-compose.yml
ports:
  - "8080:80"  # Use 8080 instead of 9999
```

### Rebuild after changes
```bash
docker-compose down
docker-compose up -d --build
```

---

## Resources

- Image size: ~25MB (Alpine-based)
- Memory usage: ~10-20MB
- CPU usage: Minimal

---

**Last Updated**: 2026-02-04
