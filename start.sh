#!/usr/bin/env sh
node api/index.js &
server_pid=$!
killserver() {
    kill -9 $server_pid
}
trap killserver EXIT

yarn run start-dev
