IMAGE_NAME=serbkjuar
CONTAINER_NAME=serbkjuar
EXTERNAL_PORT=80
INTERNAL_PORT=5000


build:
	@cd frontend && \
		npm install && \
		make build
	@docker \
		build . \
		-t $(CONTAINER_NAME)

clean:
	@echo "> Removing container $(CONTAINER_NAME)"
	- @docker rm $(CONTAINER_NAME)
	@echo "> Removing image $(CONTAINER_NAME)"
	- @docker image rm $(CONTAINER_NAME)

run:
	@docker \
		run \
		--env-file .env.production \
		--publish $(EXTERNAL_PORT):$(INTERNAL_PORT) \
		--name=$(CONTAINER_NAME) \
		$(IMAGE_NAME) \
		--detach
