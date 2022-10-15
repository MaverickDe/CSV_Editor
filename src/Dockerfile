FROM node:alpine
WORKDIR /app
COPY package.json .
RUN  node install -force
ENV PORT 3000
EXPOSE $PORT
CMD node start

