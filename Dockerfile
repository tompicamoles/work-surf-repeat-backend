# NodeJS Version 23
FROM node:23.11-bookworm-slim

# Work to Dir
WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install Node Package (production dependencies only)
RUN npm install --legacy-peer-deps --production=false

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Set Env
ENV NODE_ENV=production

# Expose Port
EXPOSE 8080

# Cmd script uses module-alias/register to handle path aliases
CMD ["npm", "run", "start"]
