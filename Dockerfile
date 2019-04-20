from node:alpine

run mkdir /app
run npm i -g serve
copy ./build /app
workdir /app
expose 5000
cmd ["serve"]
