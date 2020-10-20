#!/bin/bash 
set -euo pipefail

yarn run lint
yarn run devtest
yarn run test