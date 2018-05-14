FROM php:7.2-fpm

RUN apt-get update && apt-get install -y \
        libmcrypt-dev \
        && docker-php-ext-install pdo_mysql

COPY symfony.pool.conf  /usr/local/etc/

RUN usermod -u 1000 www-data

EXPOSE 9000
CMD ["php-fpm", "-F"]
