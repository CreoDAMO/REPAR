FROM golang:1.24-alpine AS builder

WORKDIR /build

RUN apk add --no-cache git make gcc musl-dev

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o adns-server ./aequitas/adns-server

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /build/adns-server .

RUN chmod +x ./adns-server

RUN addgroup -g 1001 -S adns && \
    adduser -S adns -u 1001

USER adns

EXPOSE 53/udp 53/tcp

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD nslookup localhost 127.0.0.1 || exit 1

CMD ["./adns-server"]
