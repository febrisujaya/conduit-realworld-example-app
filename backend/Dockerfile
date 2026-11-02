
FROM node:20-alpine

WORKDIR /app

# Copy manifest root dan workspace
COPY package.json package-lock.json ./
COPY backend/package.json ./backend/package.json

# Install dependency backend
RUN npm ci --workspace=backend --include-workspace-root=false

# Copy source code backend
COPY backend ./backend

WORKDIR /app/backend

EXPOSE 3001

CMD ["npm", "start"]
