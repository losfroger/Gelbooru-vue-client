FROM node:16-alpine as build

WORKDIR /usr/src

COPY ["package.json", "yarn.lock", "/usr/src/"]

RUN yarn install

COPY [".", "/usr/src/"]

RUN yarn run build

# FINAL IMAGE
FROM nginx:stable-alpine

COPY --from=build ["/usr/src/dist", "/usr/share/nginx/html"]
COPY ["./nginx.conf", "/etc/nginx/nginx.conf"]

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]