FROM php:7.2-apache
WORKDIR /

COPY . /var/www/html

RUN echo "ServerName localhost:80" >> /etc/apache2/apache2.conf

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]