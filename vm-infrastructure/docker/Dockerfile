# Aequitas Protocol Zone VM - Multi-Stage Docker Build
# Stage 1: Builder - Compile aequitasd binary from source
FROM golang:1.24.9-bullseye AS builder

LABEL maintainer="Aequitas Protocol Team"
LABEL description="Sovereign blockchain builder stage"

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Install build dependencies
RUN apt-get update && apt-get install -y \
    git \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /workspace

# Copy the entire aequitas blockchain source from repo root
COPY ./aequitas ./aequitas

# Change to aequitas directory and build
WORKDIR /workspace/aequitas

# Download dependencies with integrity verification
RUN go mod download && go mod verify

# Build the aequitasd binary using Makefile for consistency
RUN make install

# Verify the binary was created
RUN aequitasd version

# Export binary to predictable location for multi-stage copy
RUN cp $(which aequitasd) /usr/local/bin/aequitasd

# Stage 2: Runtime - Slim production image
FROM ubuntu:22.04 AS runtime

LABEL maintainer="Aequitas Protocol Team"
LABEL description="Sovereign blockchain VM with AI security and legal enforcement"
LABEL version="2.0.0"

# Prevent interactive prompts
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Set environment variables
ENV AEQUITAS_HOME=/var/lib/aequitas
ENV PATH=$PATH:/usr/local/bin

# Install only runtime dependencies (minimal attack surface)
RUN apt-get update && apt-get install -y \
    curl \
    jq \
    ca-certificates \
    supervisor \
    && rm -rf /var/lib/apt/lists/*

# Create aequitas user (non-root for security)
RUN useradd -m -s /bin/bash aequitas \
    && mkdir -p $AEQUITAS_HOME \
    && chown -R aequitas:aequitas $AEQUITAS_HOME

# Create directory structure
RUN mkdir -p \
    /var/lib/evidence \
    /var/log/aequitas \
    /etc/aequitas \
    && chown -R aequitas:aequitas /var/lib/evidence /var/log/aequitas

# Copy compiled binary from builder stage
COPY --from=builder /usr/local/bin/aequitasd /usr/local/bin/aequitasd

# Verify binary works in runtime stage
RUN aequitasd version

# Configure Supervisor for process management
COPY ./vm-infrastructure/docker/configs/supervisord.conf /etc/supervisor/conf.d/aequitas.conf

# Expose ports
# Tendermint RPC
EXPOSE 26657
# Tendermint P2P
EXPOSE 26656
# Cosmos REST API
EXPOSE 1317
# gRPC
EXPOSE 9090
# Prometheus
EXPOSE 26660

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:26657/health || exit 1

# Switch to aequitas user (non-root security)
USER aequitas
WORKDIR /home/aequitas

# Entrypoint script will handle initialization with env-based chain selection
COPY --chown=aequitas:aequitas ./vm-infrastructure/docker/scripts/docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["start"]
