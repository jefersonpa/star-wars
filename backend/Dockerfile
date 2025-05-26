FROM php:8.2.12

# Install system dependencies
RUN apt-get update -y && apt-get install -y \
    openssl \
    zip \
    unzip \
    git \
    libonig-dev \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libicu-dev \
    libxml2-dev \
    && docker-php-ext-install pdo mbstring pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install the Datadog PHP tracer
RUN curl -L https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php -o /tmp/datadog-setup.php \
    && php /tmp/datadog-setup.php --php-bin php \
    && rm /tmp/datadog-setup.php
    
RUN cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini

# Enable the extension
# RUN echo "extension=ddtrace.so" > /usr/local/etc/php/conf.d/ddtrace.ini \
#     && echo "ddtrace.request_init_hook=/opt/datadog-php/dd-trace-sources/bridge/dd_wrap_autoloader.php" >> /usr/local/etc/php/conf.d/ddtrace.ini

WORKDIR /app/backend
COPY . .
RUN composer install

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0