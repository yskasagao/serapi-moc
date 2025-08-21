# Use Node.js 22.6.0 to avoid Jest Worker issues and meet Next.js requirements
FROM node:22.6.0-alpine

# Set working directory
WORKDIR /app

# Install dependencies for better compatibility
RUN apk add --no-cache libc6-compat

# Copy package files
COPY package*.json ./

# Install dependencies using Yarn
RUN yarn install

# Copy source code
COPY . .

# Copy and generate Prisma clients
COPY ../../packages ./packages
RUN cd packages/media-db && npm install && npx prisma generate
RUN cd packages/company-db && npm install && npx prisma generate

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Start development server
CMD ["yarn", "dev"]