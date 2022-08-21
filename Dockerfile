FROM golang:1.19-alpine

WORKDIR /app/src
COPY ./conf/service.yaml /app
COPY ./backend .
COPY ./frontend/build /www

RUN \
    go build -v -ldflags "-s -w" -o /app/serbkjuar ./cmd/service/main.go && \
    rm -rf /app/src && \
    rm -rf /go && \
    rm -rf /usr/local/go

ENTRYPOINT ["/app/serbkjuar"]
