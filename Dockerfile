FROM clarksam19/node-server:prod AS server
WORKDIR /usr/src/app
COPY ./server .

FROM clarksam19/react-client:dev AS client-build
WORKDIR /usr/src/app
COPY ./client .
RUN npm run build

FROM node:lts-alpine
WORKDIR /usr/src/app
COPY --from=server /usr/src/app .
COPY --from=client-build /usr/src/app/build ./build
CMD ["node", "index.js"]