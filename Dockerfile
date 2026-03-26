# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install
# Copy all files
COPY . .

# Clean Next.js cache to avoid module resolution issues
RUN rm -rf .next

# Build the application
RUN npm run build || { echo "Build failed. Check Next.js version or dependency issues."; exit 1; }

# Stage 2: Run the application
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set the command to run the application
CMD ["node", "server.js"]