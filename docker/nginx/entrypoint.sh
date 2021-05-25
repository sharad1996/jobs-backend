#!/bin/sh

sed -i "s/SERVICE_NAME/${containerName}/g" /etc/nginx/conf.d/default.conf
sed -i "s/SERVICE_PORT/${containerPort}/g" /etc/nginx/conf.d/default.conf

exec "$@"
