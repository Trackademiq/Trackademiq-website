# Trackademiq-Webpage — production image for local/AWS (EC2, ECS, Elastic Beanstalk)
# Build: docker build -t trackademiq-webpage .
# Run:   docker run -p 5000:5000 -e PORT=5000 trackademiq-webpage

FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy built server bundle and client static assets
COPY --from=builder /app/dist ./dist
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

EXPOSE 5000

CMD ["node", "dist/index.cjs"]
