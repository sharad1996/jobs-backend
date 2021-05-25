FROM nginx:1.17.0-alpine

WORKDIR /etc/nginx/conf.d/

ADD docker/nginx/default.conf /etc/nginx/conf.d/default.conf
ADD docker/nginx/nginx.conf /etc/nginx/nginx.conf

ADD docker/nginx/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]

ENV PORT 80
ENV HOST 0.0.0.0

CMD [ "sh", "-c", "nginx -g 'daemon off;'" ]
