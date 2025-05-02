#!/bin/bash

# Replace env vars in the template and write to the actual nginx config
envsubst < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'
