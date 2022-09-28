CONTAINER_NAME=serbkjuar
IMAGE_NAME=serbkjuar
EXTERNAL_PORT=80
INTERNAL_PORT=5000
VERSION_TAG=$$(date +%Y%m%d-%H%M%S)


build:
	- @docker image rm $(IMAGE_NAME) --force
	@docker \
		build . \
		-t $(IMAGE_NAME)

clean:
	@echo "> Removing container $(CONTAINER_NAME)"
	- @docker rm $(CONTAINER_NAME)
	@echo "> Removing image $(CONTAINER_NAME)"
	- @docker \
		images -a \
		| grep "$(IMAGE_NAME)" \
		| awk '{print $$3}' \
		| xargs docker image rm --force \
		&>/dev/null

run:
	@docker \
		run \
		--env-file .env.production \
		--publish $(EXTERNAL_PORT):$(INTERNAL_PORT) \
		--name=$(CONTAINER_NAME) \
		$(IMAGE_NAME) \
		--detach

push:
	@docker tag \
		$(CONTAINER_NAME):latest \
		145246616467.dkr.ecr.eu-west-1.amazonaws.com/ekirin-$(CONTAINER_NAME):$(VERSION_TAG)
	@docker push \
		145246616467.dkr.ecr.eu-west-1.amazonaws.com/ekirin-$(CONTAINER_NAME):$(VERSION_TAG)
