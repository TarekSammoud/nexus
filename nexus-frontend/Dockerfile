# Stage 1: Build Angular app
FROM node:18 as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

# Stage 2: Serve with NGINX on port 4200
FROM nginx:alpine

# Expose port 4200
EXPOSE 4200

# Copy build output to NGINX folder
COPY --from=builder /app/dist/* /usr/share/nginx/html

# Update NGINX configuration to serve on port 4200
CMD ["sh", "-c", "nginx -g 'daemon off;' -p 4200"]
