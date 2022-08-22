## Building serbkjuar

Copy `.env.sample` to `.env.production` and edit settings.

```sh
$ cp .env.sample .env.production
$ vim .env.production
```

Install `react-scripts`

```sh
$ sudo npm install -g react-scripts
```

Build docker image
```sh
$ make build
```

Create container and run it for the first time
```sh
$ make run
```
