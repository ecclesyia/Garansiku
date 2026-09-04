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

# Copy Nginx template for dynamic port injection
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Copy production bundle from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create entrypoint script inside container to ensure clean POSIX LF formatting
USER root
RUN printf '%s\n' \
    '#!/bin/sh' \
    'set -e' \
    ': "${PORT:=8080}"' \
    'echo "Configuring Nginx to listen on port ${PORT}..."' \
    'envsubst '\''${PORT}'\'' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf' \
    'if [ "$#" -gt 0 ]; then' \
    '    exec "$@"' \
    'else' \
    '    exec nginx -g "daemon off;"' \
    'fi' \
    > /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh && \
    chmod -R 777 /etc/nginx/conf.d /etc/nginx/templates /var/cache/nginx /var/run /tmp
USER 101

# Expose default port
EXPOSE 8080

# Configure entrypoint and default command
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
