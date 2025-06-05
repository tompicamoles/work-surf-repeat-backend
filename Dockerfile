# Use Node.js LTS version for better stability
FROM node:20-slim

# Create app directory and set proper permissions
WORKDIR /app

# Create non-root user for security
RUN groupadd --gid 1001 --system nodejs && \
    useradd --uid 1001 --system --gid nodejs --shell /bin/bash nodejs

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci --legacy-peer-deps

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies and source files to reduce image size
RUN npm prune --production && \
    rm -rf src/ && \
    rm -rf node_modules/@types && \
    rm -rf *.ts tsconfig.json .swcrc && \
    npm cache clean --force

# Change ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Expose port (Cloud Run uses PORT env var)
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:8080/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"

# Start the application
CMD ["npm", "run", "start"]
