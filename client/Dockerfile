FROM clarksam19/react-client:dev
WORKDIR /usr/src/app
COPY ./public ./public
WORKDIR /usr/src/app/src
COPY ./src .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
