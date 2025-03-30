# Base image
FROM node:20-alpine

# Install pnpm globally
RUN npm i -g pnpm

# Create app directory
WORKDIR /app

# Copy package files first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Rebuild bcrypt (Fixes native module issue)
RUN pnpm rebuild bcrypt

# Copy the application source code
COPY . .

# Generate Prisma Client
RUN pnpm prisma generate

# Build the NestJS application
RUN pnpm build

# Expose the port the app runs on
EXPOSE 3001

# Start the server using the production build
CMD ["pnpm", "start"]
