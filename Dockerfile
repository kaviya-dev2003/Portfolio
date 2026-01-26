FROM node:18-alpine
WORKDIR /app

# Copy ALL server files, not just one
COPY server/ ./server/

# Install dependencies
WORKDIR /app/server
RUN npm ci --only=production

EXPOSE 3000
CMD ["node", "dist/index.js"]  # or "server-prod.js" if that's your entry