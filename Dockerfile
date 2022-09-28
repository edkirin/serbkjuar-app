ARG USER=1000

# stage 1: build node frontend
FROM node:18 as node-builder

WORKDIR /node-builder
COPY ./frontend .
RUN \
    npm install && \
    npm run build


# stage 2: build golang backend
FROM golang:1.19-alpine as go-builder

WORKDIR /go-builder
COPY ./backend .
RUN \
    go mod download && \
    go mod verify && \
    go build -v -ldflags "-s -w" -o serbkjuar ./cmd/service/main.go


# stage 2: build final container
FROM alpine:3.16

USER $USER
WORKDIR /app
COPY ./conf/service.yaml /app
COPY --from=node-builder /node-builder/build /www
COPY --from=go-builder /go-builder/serbkjuar /app

ENTRYPOINT ["/app/serbkjuar"]
