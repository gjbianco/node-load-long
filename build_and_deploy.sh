#!/bin/bash
# must have Node.js >= 16
# if on RHEL 8, use NVM to install

# often need to log out fully to recreate the token with login
npx nodeshift logout

npx nodeshift login \
  --server https://api.ocp4.example.com:6443 \
  --insecure \
  --username developer \
  --password developer
  # --namespace.name # nodeshift-test # not sure if this does anything

# alternatively pass a command, such as `resource`
npx nodeshift \
  --expose \
  --useDeployment \
  --namespace.create \
  --namespace.name "nodeshift-test"
