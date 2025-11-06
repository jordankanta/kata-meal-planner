# Technical Stack - MealPrep

## Backend
- **Laravel 11.x** (PHP 8.2+) - RESTful API
- **Laravel Sanctum** - Authentication
- **MySQL 8.0+** - Database
- **Redis** - Caching, sessions, queues
- **Laravel Scout** - Recipe search
- **Intervention Image** - Image optimization
- **Laravel Excel** - PDF/Excel export

## Frontend
- **Nuxt 3** (Vue 3) - SSR framework
- **TypeScript** - Type safety
- **Tailwind CSS 3.x** - UI styling (primary: #FF8C00, #FFD700)
- **Pinia** - State management
- **Headless UI** - Accessible components
- **Heroicons** - Icon library
- **VeeValidate + Yup** - Form validation
- **@vueuse/core** - Vue utilities
- **date-fns** - Date formatting

## Development
- **Composer** / **npm/pnpm** - Package management
- **Docker + Docker Compose** - Local development
- **Laravel Sail** - Docker environment (optional)
- **PHPUnit / Pest** - Backend testing
- **Vitest** - Frontend testing
- **Playwright / Cypress** - E2E testing
- **ESLint + Prettier** - Code formatting
- **PHP CS Fixer / Laravel Pint** - PHP formatting
- **PHPStan** - Static analysis

## Infrastructure
- **Nginx** - Web server
- **GitHub Actions / GitLab CI** - CI/CD
- **Laravel Forge / Vapor** - Backend hosting
- **Vercel / Netlify** - Frontend hosting
- **AWS S3 / DO Spaces** - File storage
- **Sentry** - Error tracking
- **Laravel Telescope** - Debugging (dev)

## Services
- **SendGrid / Mailgun / SES** - Email
- **Google Analytics / Plausible** - Analytics (optional)

## Security
- HTTPS/SSL (Let's Encrypt)
- CSRF protection
- XSS protection
- Rate limiting
- Password hashing (bcrypt)

## Performance
- Page load: < 2s
- API response: < 500ms
- Image optimization (WebP, lazy loading)
- Redis caching

## Accessibility
- WCAG 2.1 Level AA
- Keyboard navigation
- ARIA labels
- 4.5:1 color contrast
