# ==========================================
# Stage 1: Build static assets
# ==========================================
FROM docker.io/library/node:22-alpine AS builder

WORKDIR /app

# Install dependencies deterministically
COPY package.json package-lock.json ./
RUN npm ci

# Copy project files and compile production bundle
COPY . .
RUN npm run build

# ==========================================
# Stage 2: Unprivileged Nginx for Heroku & Local
# ==========================================
FROM docker.io/nginxinc/nginx-unprivileged:alpine AS runner

# Default port for local runs; Heroku injects dynamic $PORT at runtime
ENV PORT=8080
# Restrict envsubst to PORT only to avoid corrupting Nginx internal variables like $uri
ENV NGINX_ENVSUBST_FILTER="PORT"

# Copy Nginx template for dynamic port injection
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Copy production bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Grant full write access to config and temp dirs so arbitrary UIDs (Heroku) can run envsubst
USER root
RUN chmod -R 777 /etc/nginx/conf.d /etc/nginx/templates /var/cache/nginx /var/run /tmp
USER 101

# Expose default port
EXPOSE 8080

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
