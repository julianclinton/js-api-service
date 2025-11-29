#!/usr/bin/env bash
docker build -t js-api-gateway .
docker run --init -p 3001:3001 -it js-api-gateway