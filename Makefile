CONTAINER_NAME=serbkjuar
IMAGE_NAME=$(CONTAINER_NAME):latest
EXTERNAL_PORT=80
INTERNAL_PORT=5000


build:
	- @docker image rm $(IMAGE_NAME) --force
	@cd frontend && \
		npm install && \
		make build
	@docker \
		build . \
		-t $(IMAGE_NAME)

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

push:
	@docker tag $(IMAGE_NAME) edkirin/$(IMAGE_NAME)
	@docker push edkirin/$(IMAGE_NAME)
