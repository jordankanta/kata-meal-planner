# MealPrep - Meal Planning & Recipe Management

Weekly meal planning application with recipe management, shopping lists, and family preferences.

## Quick Start with Docker

```bash
# One-command setup
./docker-start.sh

# Or manually
docker compose up -d
```

**Services:**
- Frontend (Nuxt): `http://localhost:3000`
- Backend (Laravel): `http://localhost:8000`
- MySQL: `localhost:3306`

See [README.docker.md](README.docker.md) for detailed Docker documentation.

## Manual Development Setup

### Backend (Laravel 12.0)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (Nuxt 4.2.0)
```bash
cd frontend
npm install
npm run dev
```

## Documentation

- [Project Brief](docs/memory-bank/PROJECT_BRIEF.md)
- [Tech Stack](docs/memory-bank/STACK.md)
- [Docker Setup](README.docker.md)
- [Issues](docs/issues/README.md)
- [Tasks](docs/tasks/README.md)

## Architecture

- **Backend**: Laravel 12.0 (PHP 8.2+) - RESTful API
- **Frontend**: Nuxt 4.2.0 (Vue 3.5) - SSR
- **Database**: SQLite (dev) / MySQL (docker/prod)
