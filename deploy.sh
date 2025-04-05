#!/bin/bash

cd /var/www/gym-management || exit

echo "Pulling latest changes..."
git pull origin main

echo "Installing composer dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader

echo "Running Laravel tasks..."
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Setting permissions..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

echo "Deployment complete!"
