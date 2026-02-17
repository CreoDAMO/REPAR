FROM golang:1.24-alpine AS builder

WORKDIR /build

RUN apk add --no-cache git make gcc musl-dev

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o autonomous-agent ./cmd/autonomous-agent

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=builder /build/autonomous-agent .

RUN chmod +x ./autonomous-agent

RUN addgroup -g 1001 -S agent && \
    adduser -S agent -u 1001

USER agent

CMD ["./autonomous-agent"]
