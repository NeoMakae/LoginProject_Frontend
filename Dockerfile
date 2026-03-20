# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy Angular source code
COPY . .

# Build the Angular app for production
RUN npx ng build --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy built Angular files
COPY --from=build /app/dist/frontend-login/browser /usr/share/nginx/html
# Copy custom Nginx config (for routing, SPA fallback)
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]