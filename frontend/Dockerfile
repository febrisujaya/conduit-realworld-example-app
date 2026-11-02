
# Stage 1: Build frontend
FROM node:20-alpine AS builder

WORKDIR /app

# Copy manifest root dan frontend
COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/package.json

# Install dependency frontend
RUN npm ci --workspace=frontend --include-workspace-root=false

# Copy source frontend
COPY frontend ./frontend

# Build aplikasi
WORKDIR /app/frontend
RUN npm run build

# Stage 2: Production menggunakan Nginx
FROM nginx:alpine
COPY --from=builder /app/frontend/dist /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
