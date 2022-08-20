FROM golang:1.19-alpine

WORKDIR /app/src
COPY ./conf/service.yaml /app
COPY ./backend .
COPY ./frontend/build /www

RUN \
    go build -v -o /app/serbkjuar ./cmd/service/main.go && \
    rm -rf /app/src

ENTRYPOINT ["/app/serbkjuar"]
