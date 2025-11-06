# Technical Stack - MealPrep

## Backend (Current)
- **Laravel 12.0** (PHP 8.2+) - RESTful API
- **SQLite** - Database (default, MySQL/MariaDB/PostgreSQL supported)
- **Vite 7.0** - Asset bundling
- **Tailwind CSS 4.0** - Backend UI styling
- **Axios 1.11** - HTTP client
- **Concurrently** - Process management

### Backend - To Be Added
- **Laravel Sanctum** - Authentication
- **Redis** - Caching, sessions, queues
- **Laravel Scout** - Recipe search
- **Intervention Image** - Image optimization
- **Laravel Excel** - PDF/Excel export

## Frontend (Current)
- **Nuxt 4.2.0** (Vue 3.5) - SSR framework
- **Vue Router 4.6** - Routing

### Frontend - To Be Added
- **TypeScript** - Type safety
- **Tailwind CSS 4.0** - UI styling (primary: #FF8C00, #FFD700)
- **Pinia** - State management
- **Headless UI** - Accessible components
- **Heroicons** - Icon library
- **VeeValidate + Yup** - Form validation
- **@vueuse/core** - Vue utilities
- **date-fns** - Date formatting

## Development
- **Composer** / **npm** - Package management
- **Laravel Sail** - Docker environment
- **PHPUnit 11.5** - Backend testing
- **Laravel Pint** - PHP code formatting
- **Laravel Pail** - Log viewer
- **Faker** - Test data generation
- **Mockery** - Mocking framework
- **Collision** - Error reporting

### Development - To Be Added
- **Vitest** - Frontend testing
- **Playwright / Cypress** - E2E testing
- **ESLint + Prettier** - Frontend code formatting
- **PHPStan** - Static analysis

## Infrastructure (Planned)
- **Nginx** - Web server
- **GitHub Actions / GitLab CI** - CI/CD
- **Laravel Forge / Vapor** - Backend hosting
- **Vercel / Netlify** - Frontend hosting
- **AWS S3 / DO Spaces** - File storage
- **Sentry** - Error tracking
- **Laravel Telescope** - Debugging (dev)

## Services (Planned)
- **SendGrid / Mailgun / SES** - Email
- **Google Analytics / Plausible** - Analytics (optional)

## Security (Planned)
- HTTPS/SSL (Let's Encrypt)
- CSRF protection (Laravel default)
- XSS protection (Laravel default)
- Rate limiting
- Password hashing (bcrypt)

## Performance (Targets)
- Page load: < 2s
- API response: < 500ms
- Image optimization (WebP, lazy loading)
- Redis caching (when added)

## Accessibility (Targets)
- WCAG 2.1 Level AA
- Keyboard navigation
- ARIA labels
- 4.5:1 color contrast
