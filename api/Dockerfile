FROM oven/bun:latest

WORKDIR /usr/src/app

# Install dependencies
COPY package.json bun.lockb ./
RUN bun install

# Copy application files
COPY . .

# Get environment variables from docker compose
ARG DB_URL
ARG JWT_SECRET_KEY
ARG RESEND_API_KEY
ARG OAUTH_CLIENT_ID
ARG OAUTH_CLIENT_SECRET

# Set environment variables for runtime
ENV API_PORT="3000"
ENV API_BASE_URL="http://localhost:${API_PORT}"
ENV AUTH_REDIRECT_URL="${API_BASE_URL}/auth/callback"

ENV DB_URL ${DB_URL}
ENV JWT_SECRET_KEY ${JWT_SECRET_KEY}
ENV RESEND_API_KEY ${RESEND_API_KEY}
ENV OAUTH_CLIENT_ID ${OAUTH_CLIENT_ID}
ENV OAUTH_CLIENT_SECRET ${OAUTH_CLIENT_SECRET}

# Run the app
USER bun
CMD [ "bun", "dev" ]

EXPOSE 3000/tcp

