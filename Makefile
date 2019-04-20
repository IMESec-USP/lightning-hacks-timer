PORT=8888

dev:
		yarn start

build:
		yarn build
		docker build -t timer .

build-and-run:
		yarn build
		docker build -t timer .
		docker run -p ${PORT}:5000 timer