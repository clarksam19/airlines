FROM clarksam19/react-client:dev
WORKDIR /usr/src/app
COPY ./public ./public
COPY ./src ./src
RUN rm -rf local
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
