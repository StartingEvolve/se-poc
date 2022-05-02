FROM ghcr.io/openfaas/of-watchdog:0.9.2 AS watchdog


# Use official node image as the base image
FROM node:latest as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


RUN find dist/

FROM alpine:3.14 AS runtime
WORKDIR /home/app/
RUN addgroup -S -g 1000 app && adduser -S -u 1000 -g app app

COPY --from=build /usr/local/app/dist/se-poc /home/app/public
WORKDIR /home/app/public

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog

RUN chown app:app -R /home/app \
    && chmod 777 /tmp

USER app

ENV mode="static"
ENV static_path="/home/app/public"

ENV exec_timeout="10s"
ENV write_timeout="11s"
ENV read_timeout="11s"

HEALTHCHECK --interval=5s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]
