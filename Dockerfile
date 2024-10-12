# Updated Dockerfile
FROM node:14 AS frontend

WORKDIR /app

# Copy the repository code (from GitHub Actions checkout)
COPY . /app

# Build backend
WORKDIR /app/NullAway-Sandbox/compiler
RUN ./build.sh

# Build frontend
WORKDIR /app/NullAway-Sandbox/ui/frontend
RUN yarn && yarn run watch

# Build Rust server
WORKDIR /app/NullAway-Sandbox/ui
RUN cargo build --release

EXPOSE 8000
CMD ["cargo", "run"]
