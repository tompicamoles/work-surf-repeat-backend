# NodeJS Version 22
FROM node:22.15-alpine
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
EXPOSE 4000

# Cmd script uses module-alias/register to handle path aliases
CMD ["npm", "run", "start"]
