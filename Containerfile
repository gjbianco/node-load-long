FROM registry.access.redhat.com/ubi9/nodejs-18 as builder
WORKDIR long-load
USER 0
ADD . .
RUN chown -R 1001:0 /opt/app-root/src/long-load
USER 1001
RUN npm install

FROM registry.access.redhat.com/ubi9/nodejs-18-minimal
ENV START_DELAY 1000
COPY --from=builder $HOME/long-load $HOME
CMD npm start
