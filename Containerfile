FROM registry.access.redhat.com/ubi9/nodejs-18-minimal as builder
USER root
ADD . $HOME
RUN npm install

FROM registry.access.redhat.com/ubi9/nodejs-18-minimal
ENV START_DELAY 10000
COPY --from=builder $HOME $HOME
CMD npm start
