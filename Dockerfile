FROM node:latest AS builder
WORKDIR /workdir
COPY . /workdir
RUN yarn install
RUN yarn build

# run
FROM node:latest
WORKDIR /workdir
ENV NODE_ENV production
COPY --from=builder /workdir/dist /workdir
COPY --from=builder /workdir/package.json /workdir
COPY --from=builder /workdir/yarn.lock /workdir
RUN yarn install --prod
EXPOSE 3001
CMD ["node", "main.js"]

