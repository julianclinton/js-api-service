FROM node:22-alpine AS baseimage

WORKDIR /app

LABEL name="js-api-gateway" \
  version="0.1.0"

COPY src src
COPY package.json package-lock.json buildInfo.json auth_config.json ./

# ---------------
FROM baseimage AS installimage

WORKDIR /app

# Install OpenSSL for cert generation
RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

RUN npm install --production --progress=false

# Create certificates
RUN mkdir -p /app/tls && \
  npm run certs

# ---------------
FROM installimage AS testimage

WORKDIR /app

COPY test test

RUN npm install --only=dev --progress=false \
  && npm run test

# ---------------
FROM baseimage AS prodimage

RUN apk update && apk add bash

# set working directory
WORKDIR /app

COPY --from=installimage /app/node_modules ./node_modules
COPY --from=installimage /app/auth_config.json ./auth_config.json
COPY --from=installimage /app/tls ./tls

ENV ASSET_SERVICE_HOST=jsassets
ENV EM_SERVICE_HOST=jsevents

EXPOSE 3001

CMD ["/bin/bash", "-c", "NODE_ENV=production node src/index.js"]
