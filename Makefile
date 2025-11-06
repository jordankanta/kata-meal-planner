.PHONY: help up down build restart logs shell-backend shell-frontend shell-db clean

help: ## Show this help message
	@echo 'MealPrep Docker Commands'
	@echo ''
	@echo 'Usage:'
	@echo '  make [target]'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

up: ## Start all services
	docker compose up -d

down: ## Stop all services
	docker compose down

build: ## Build/rebuild containers
	docker compose build --no-cache

restart: ## Restart all services
	docker compose restart

logs: ## Follow logs from all services
	docker compose logs -f

shell-backend: ## Open shell in backend container
	docker compose exec backend bash

shell-frontend: ## Open shell in frontend container
	docker compose exec frontend sh

shell-db: ## Open MySQL shell
	docker compose exec database mysql -u mealprep -psecret mealprep

migrate: ## Run Laravel migrations
	docker compose exec backend php artisan migrate

migrate-fresh: ## Fresh migrations with seed
	docker compose exec backend php artisan migrate:fresh --seed

test-backend: ## Run backend tests
	docker compose exec backend php artisan test

clean: ## Remove all containers, volumes, and images
	docker compose down -v --rmi local
