# Docker Setup - MealPrep

## Services

- **Backend**: Laravel 12.0 (PHP 8.2) on `http://localhost:8000`
- **Frontend**: Nuxt 4.2.0 (Node 20) on `http://localhost:3000`
- **Database**: MySQL 8.0 on `localhost:3306`

## Quick Start

### 1. First Time Setup

```bash
# Copy environment file
cp .env.docker backend/.env

# Build and start containers
docker compose up -d

# Backend will automatically:
# - Install composer dependencies
# - Generate APP_KEY
# - Run migrations

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

### 2. Daily Development

```bash
# Start services
docker compose up

# Start in background
docker compose up -d

# Stop services
docker compose down

# Stop and remove volumes (cleans database)
docker compose down -v
```

## Common Commands

### Backend (Laravel)

```bash
# Run artisan commands
docker compose exec backend php artisan migrate
docker compose exec backend php artisan migrate:fresh --seed
docker compose exec backend php artisan tinker

# Install PHP packages
docker compose exec backend composer require package/name

# Run tests
docker compose exec backend php artisan test
docker compose exec backend ./vendor/bin/phpunit

# Code formatting
docker compose exec backend ./vendor/bin/pint
```

### Frontend (Nuxt)

```bash
# Run npm commands
docker compose exec frontend npm install package-name
docker compose exec frontend npm run build

# Access container shell
docker compose exec frontend sh
```

### Database

```bash
# MySQL shell
docker compose exec database mysql -u mealprep -psecret mealprep

# MySQL root access
docker compose exec database mysql -u root -proot

# Backup database
docker compose exec database mysqldump -u mealprep -psecret mealprep > backup.sql

# Restore database
docker compose exec -T database mysql -u mealprep -psecret mealprep < backup.sql
```

## Logs

```bash
# View all logs
docker compose logs

# Follow logs
docker compose logs -f

# Service-specific logs
docker compose logs backend
docker compose logs frontend
docker compose logs database

# Laravel logs inside container
docker compose exec backend tail -f storage/logs/laravel.log
```

## Rebuild

```bash
# Rebuild after Dockerfile changes
docker compose build

# Rebuild specific service
docker compose build backend

# Rebuild without cache
docker compose build --no-cache

# Rebuild and restart
docker compose up -d --build
```

## Troubleshooting

### Backend Issues

**APP_KEY encryption error:**
```
Unsupported cipher or incorrect key length
```

Fix:
```bash
# Stop containers
docker compose down

# Ensure .env exists and has proper config
./docker-start.sh

# Or manually
cp backend/.env.example backend/.env
docker compose exec backend php artisan key:generate --force
docker compose restart backend
```

**Permission errors:**
```bash
docker compose exec backend chown -R www-data:www-data storage bootstrap/cache
docker compose exec backend chmod -R 755 storage bootstrap/cache
```

**Clear Laravel cache:**
```bash
docker compose exec backend php artisan cache:clear
docker compose exec backend php artisan config:clear
docker compose exec backend php artisan route:clear
docker compose exec backend php artisan view:clear
```

**Reinstall dependencies:**
```bash
docker compose exec backend rm -rf vendor
docker compose exec backend composer install
```

### Frontend Issues

**Node modules issues:**
```bash
docker compose exec frontend rm -rf node_modules
docker compose exec frontend npm install
```

**Clear Nuxt cache:**
```bash
docker compose exec frontend rm -rf .nuxt
docker compose exec frontend npm run dev
```

### Database Issues

**Reset database:**
```bash
docker compose down -v
docker compose up -d
docker compose exec backend php artisan migrate:fresh --seed
```

**Can't connect to MySQL:**
- Check database is healthy: `docker compose ps`
- Wait for healthcheck to pass (10-30 seconds on first start)

### General Issues

**Port already in use:**
```bash
# Check what's using the port
lsof -i :8000  # or :3000, :3306

# Change ports in docker-compose.yml
ports:
  - "8001:8000"  # External:Internal
```

**Start fresh:**
```bash
docker compose down -v
docker compose build --no-cache
docker compose up -d
```

## Production Notes

For production deployment:

1. **Update Dockerfiles:**
   - Use multi-stage builds
   - Run `npm run build` for frontend
   - Set `APP_ENV=production`

2. **Update docker-compose.yml:**
   - Remove volume mounts (use COPY instead)
   - Set proper environment variables
   - Use secrets for sensitive data
   - Add nginx reverse proxy

3. **Security:**
   - Change default passwords
   - Use strong APP_KEY
   - Enable HTTPS
   - Configure proper CORS

## Architecture

```
┌─────────────────────────────────────────┐
│  Docker Host (localhost)                │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │  Frontend (Nuxt)                  │ │
│  │  Port: 3000                       │ │
│  │  Volume: ./frontend → /app        │ │
│  └──────────────┬────────────────────┘ │
│                 │                       │
│  ┌──────────────▼────────────────────┐ │
│  │  Backend (Laravel)                │ │
│  │  Port: 8000                       │ │
│  │  Volume: ./backend → /var/www/html│ │
│  └──────────────┬────────────────────┘ │
│                 │                       │
│  ┌──────────────▼────────────────────┐ │
│  │  Database (MySQL)                 │ │
│  │  Port: 3306                       │ │
│  │  Volume: database-data            │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Network: mealprep-network              │
└─────────────────────────────────────────┘
```

## Volumes

- `backend-vendor`: Composer dependencies (persistent)
- `backend-node-modules`: Backend npm packages (persistent)
- `frontend-node-modules`: Frontend npm packages (persistent)
- `frontend-nuxt`: Nuxt build cache (persistent)
- `database-data`: MySQL data (persistent)

These volumes improve performance by avoiding sync overhead for dependency folders.
