# Aequitas Protocol Zone VM - Docker Container
FROM ubuntu:22.04

LABEL maintainer="Aequitas Protocol Team"
LABEL description="Sovereign blockchain VM with AI security and legal enforcement"
LABEL version="1.0.0"

# Prevent interactive prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=UTC

# Set environment variables
ENV AEQUITAS_HOME=/var/lib/aequitas
ENV COSMOS_SDK_VERSION=v0.50.11
ENV GO_VERSION=1.21.0
ENV NODE_VERSION=20.x

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    git \
    build-essential \
    jq \
    nginx \
    supervisor \
    ufw \
    fail2ban \
    python3 \
    python3-pip \
    nodejs \
    npm \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# Install Go
RUN wget https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz \
    && tar -C /usr/local -xzf go${GO_VERSION}.linux-amd64.tar.gz \
    && rm go${GO_VERSION}.linux-amd64.tar.gz

ENV PATH=$PATH:/usr/local/go/bin:$HOME/go/bin

# Create aequitas user
RUN useradd -m -s /bin/bash aequitas \
    && mkdir -p $AEQUITAS_HOME \
    && chown -R aequitas:aequitas $AEQUITAS_HOME

# Create directory structure
RUN mkdir -p \
    /var/lib/evidence \
    /var/log/aequitas \
    /etc/aequitas \
    /opt/cerberus \
    /opt/arbitration

# Install Cosmos SDK and build tools
WORKDIR /tmp
RUN git clone https://github.com/cosmos/cosmos-sdk.git \
    && cd cosmos-sdk \
    && make install

# Copy Aequitas blockchain code
COPY ./blockchain /opt/aequitas-blockchain
WORKDIR /opt/aequitas-blockchain
RUN make install

# Install AI Security Layer (Cerberus Auditor)
COPY ./security/cerberus /opt/cerberus
WORKDIR /opt/cerberus
RUN pip3 install -r requirements.txt

# Install Legal Enforcement Engine
COPY ./enforcement /opt/arbitration
WORKDIR /opt/arbitration
RUN npm install

# Install Frontend Dashboard
COPY ./dashboard /opt/dashboard
WORKDIR /opt/dashboard
RUN npm install && npm run build

# Configure Nginx
COPY ./configs/nginx.conf /etc/nginx/sites-available/aequitas
RUN ln -s /etc/nginx/sites-available/aequitas /etc/nginx/sites-enabled/ \
    && rm /etc/nginx/sites-enabled/default

# Configure Supervisor for process management
COPY ./configs/supervisord.conf /etc/supervisor/conf.d/aequitas.conf

# Initialize blockchain
USER aequitas
WORKDIR /home/aequitas
RUN aequitasd init aequitas-node --chain-id aequitas-1 \
    && aequitasd config chain-id aequitas-1 \
    && aequitasd config keyring-backend test

# Copy genesis and configuration
COPY --chown=aequitas:aequitas ./configs/genesis.json $AEQUITAS_HOME/config/genesis.json
COPY --chown=aequitas:aequitas ./configs/app.toml $AEQUITAS_HOME/config/app.toml
COPY --chown=aequitas:aequitas ./configs/config.toml $AEQUITAS_HOME/config/config.toml

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
# Dashboard
EXPOSE 3000
# Nginx (HTTPS)
EXPOSE 443
# Nginx (HTTP)
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:26657/health || exit 1

# Switch back to root for supervisor
USER root

# Start all services via supervisor
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]
