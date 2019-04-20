.PHONY: build build-and-run

PORT=8888

dev:
		yarn start

build:
		docker build -t timer .

build-and-run:
		docker build -t timer .
		docker run -p ${PORT}:5000 timer
