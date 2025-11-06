#!/bin/bash

# MealPrep Docker Quick Start Script

echo "🚀 MealPrep Docker Setup"
echo "========================"
echo ""

# Check if .env exists in backend
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env from .env.example..."
    if [ -f backend/.env.example ]; then
        cp backend/.env.example backend/.env
        echo "✅ Created backend/.env"
    else
        echo "❌ backend/.env.example not found!"
        exit 1
    fi
else
    echo "✅ backend/.env already exists"
fi

# Update database settings for Docker
echo "🔧 Configuring database for Docker..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/' backend/.env
    sed -i '' 's/DB_HOST=.*/DB_HOST=database/' backend/.env
    sed -i '' 's/DB_DATABASE=.*/DB_DATABASE=mealprep/' backend/.env
    sed -i '' 's/DB_USERNAME=.*/DB_USERNAME=mealprep/' backend/.env
    sed -i '' 's/DB_PASSWORD=.*/DB_PASSWORD=secret/' backend/.env
else
    # Linux
    sed -i 's/DB_CONNECTION=sqlite/DB_CONNECTION=mysql/' backend/.env
    sed -i 's/DB_HOST=.*/DB_HOST=database/' backend/.env
    sed -i 's/DB_DATABASE=.*/DB_DATABASE=mealprep/' backend/.env
    sed -i 's/DB_USERNAME=.*/DB_USERNAME=mealprep/' backend/.env
    sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=secret/' backend/.env
fi

# Add missing DB settings if they don't exist
grep -q "DB_CONNECTION" backend/.env || echo "DB_CONNECTION=mysql" >> backend/.env
grep -q "DB_HOST" backend/.env || echo "DB_HOST=database" >> backend/.env
grep -q "DB_DATABASE" backend/.env || echo "DB_DATABASE=mealprep" >> backend/.env
grep -q "DB_USERNAME" backend/.env || echo "DB_USERNAME=mealprep" >> backend/.env
grep -q "DB_PASSWORD" backend/.env || echo "DB_PASSWORD=secret" >> backend/.env

echo "✅ Database configuration updated"

echo ""
echo "🐳 Building and starting Docker containers..."
echo ""

docker compose up -d --build

echo ""
echo "⏳ Waiting for services to be ready..."
sleep 10

echo ""
echo "✨ Setup complete!"
echo ""
echo "📍 Services running:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:8000"
echo "   MySQL:    localhost:3306"
echo ""
echo "📖 See README.docker.md for more commands"
echo ""
echo "🔍 View logs with: docker compose logs -f"
echo "🛑 Stop with: docker compose down"
