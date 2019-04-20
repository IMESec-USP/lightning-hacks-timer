from node:alpine as build

run mkdir /app
copy . /app
workdir app
run npm i -g yarn
run yarn
run yarn build


from ubuntu:latest

run apt update
run apt install -y npm
run npm i -g serve
copy --from=build /app/build /app
workdir /app
expose 8998
cmd ["serve", "-p", "8998"]
