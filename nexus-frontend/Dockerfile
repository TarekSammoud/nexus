# Stage 1: Build Angular app
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --output-path=./dist/out --output-hashing=all

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy Angular build output
COPY --from=builder /app/dist/out/ /usr/share/nginx/html

# Copy the NGINX config template
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

# Use entrypoint script to substitute env vars and start nginx
CMD ["nginx", "-g", "daemon off;"]
