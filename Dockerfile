# stage 1: build application
FROM golang:1.19-alpine as builder

WORKDIR /builder
COPY ./backend .

RUN \
    go mod download && \
    go mod verify && \
    go build -v -ldflags "-s -w" -o serbkjuar ./cmd/service/main.go


# stage 2: build final container
FROM alpine:3.16

WORKDIR /app
COPY ./conf/service.yaml /app
COPY ./frontend/build /www
COPY --from=builder /builder/serbkjuar /app

ENTRYPOINT ["/app/serbkjuar"]
