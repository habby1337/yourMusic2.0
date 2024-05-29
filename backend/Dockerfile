FROM php:8.1-apache
WORKDIR /

COPY . /var/www/html

RUN chmod 755 -R /var/www/html/ 

RUN echo "ServerName localhost:80" >> /etc/apache2/apache2.conf

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]