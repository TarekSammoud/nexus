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

# Use a custom NGINX config to serve on port 4200
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
