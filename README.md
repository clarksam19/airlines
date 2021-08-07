This project is Dockerized. Developers will need to install the Docker CLI to run the npm scripts from the root directory. Once the containers are running, no dependencies will need to be installed on the local machine. However, any development dependencies related to formatting of the local environment, such as `Prettier` and `ESLint` will still need to be installed locally.

## Available Scripts

**Warning: if you make any changes to the Docker-related files that you want to take effect in the app, you will need to run `docker-compose` manually with the `--build` flag.**

In the root directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

Run `docker ps` to view the running containers.

### `npm run stop:dev`

Tears down the containers and stops the app.

### `npm run start`

Builds the production-optimized app and runs the containers in production mode.<br />
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

Run `docker ps` to view the running containers.

### `npm run start:in`

Same as `npm run start` with the addition of bashing into the running production container.

### `npm run stop`

Tears down the containers and stops the production app.

### `npm run start:in`

Same as `npm run start` with the addition of bashing into the running production container.

### `npm run deploy`

Run this command to stage, commit, and push all changed files to the remote repository. GitHub Actions will push the latest images to Docker Hub and deploy the production container to Heroku.

### Create-React-App Information

Please see the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
