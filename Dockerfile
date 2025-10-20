FROM node:25.0.0-slim

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]
