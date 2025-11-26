FROM golang:1.23-alpine AS builder

WORKDIR /build

RUN apk add --no-cache make git gcc musl-dev linux-headers

COPY aequitas/go.mod aequitas/go.sum ./
RUN go mod download

COPY aequitas/ ./

ARG BLOCKCHAIN_ENV=mainnet
ENV BLOCKCHAIN_ENV=${BLOCKCHAIN_ENV}

RUN mkdir -p /build/output && \
    CGO_ENABLED=1 go build -ldflags="-s -w" -o /build/output/aequitasd ./cmd/aequitasd

FROM alpine:3.19

RUN apk add --no-cache ca-certificates jq bash curl

RUN addgroup -S aequitas && adduser -S aequitas -G aequitas

COPY --from=builder /build/output/aequitasd /usr/local/bin/

RUN chown aequitas:aequitas /usr/local/bin/aequitasd

USER aequitas

WORKDIR /home/aequitas

EXPOSE 26656 26657 1317 9090 9091

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:26657/health || exit 1

ENTRYPOINT ["aequitasd"]
CMD ["start"]
