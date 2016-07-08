#!/usr/bin/env bash
NOIPP_ID=$(ps aux | grep ./noip2 | grep nobody | awk '/ /{print $2}')
kill -9 ${NOIPP_ID}
cd /home/orangepi/noip-2.1.9-1/ && ./noip2
