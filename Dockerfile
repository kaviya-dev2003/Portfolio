FROM node:18-alpine

WORKDIR /app

# Copy server files
COPY server/package*.json ./server/
COPY server/server-prod.js ./server/

# Copy React build
# COPY client/build ./client/build

# Install server dependencies
RUN cd server && npm ci --only=production

# Expose port
EXPOSE 8080

# Start server
CMD ["node", "server/server-prod.js"]