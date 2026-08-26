# Full Stack Open 2024 - Part 12: Containers

This project is a fully containerized Todo Application developed as part of the Full Stack Open DevOps Part 12. It consists of a React frontend, Express backend, MongoDB database, Redis-based statistics counter, and an Nginx reverse proxy. Both development and production environments are supported using Docker Compose.

## 📜 Certificate of Completion
With the successful completion of assignments 12.1. through 12.21. of the tenth part of the Full Stack Open course, I received the following certificate from the University of Helsinki:

Containers Module Certificate: [View Certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fs-containers/en/650e207f50c96ddeb4e1628bef3bcfa4)

## ✅ Exercises Overview

### 12.1: Using a computer (without graphical user interface)

This task marks the beginning of our journey beyond JavaScript and into the world of terminal-based development. As a foundation for containerization and DevOps work, we practiced basic command line usage without relying on a graphical user interface.

**Steps Completed**:
  1. Read the background material on terminal usage and its importance.
  2. Downloaded and prepared the exercise repository as instructed.
  3. Used `curl` to fetch the contents of `http://helsinki.fi` and saved the response into a file at: `script-answers/exercise12_1.txt`

### 12.2: Running your second container

In this exercise, we took our first practical steps into working inside Docker containers by interacting with an Ubuntu container and performing basic file operations within it.

**Steps Completed**:
  1. Launched an interactive Ubuntu container using the command provided in the `hello-world` output.
  2. Inside the container:
    - Created a new directory at `/usr/src/app`
    - Created an empty file named `index.js` within that directory
  3. Exited the container session using the `exit` command
  4. Recorded the entire process using the `script` tool and saved the output as: `script-answers/exercise12_2.txt`

This exercise demonstrated how to run containers interactively and carry out common tasks such as file system navigation and file creation from within a containerized Linux environment.

### 12.3: Ubuntu 101

In this exercise, we worked with the Nano text editor inside the Ubuntu container to edit a JavaScript file.

**Steps Completed**:
  1. Opened the container session and navigated to `/usr/src/app/index.js`.
  2. Edited the file using the Nano editor and added the following line of code:
    ```js
    console.log('Hello World');
    ```
  3. Recorded the entire process using the `script` tool and saved the output as: `script-answers/exercise12_3.txt`

This exercise demonstrated basic file editing with Nano in the terminal.

### 12.4: Ubuntu 102

In this exercise, we installed Node.js inside the Ubuntu container and ran the previously edited `index.js` file to execute the JavaScript code.

**Steps Completed**:
  1. Installed Node.js inside the container by running the following commands:
    - Installed `curl` (if not already available) and used it to set up Node.js:
      ```bash
      curl -sL https://deb.nodesource.com/setup_20.x | bash
      apt install -y nodejs
		  ```
  2. Verified the installation by running the `index.js` file with Node.js using:
    ```bash
    node /usr/src/app/index.js
		```
	  - The output displayed: `Hello World`
  3. Recorded the entire process using the `script` tool and saved the output as: `script-answers/exercise12_4.txt`

This exercise showed how to install software inside a container and run JavaScript code using Node.js.

### 12.5: Containerizing a Node application

This exercise focused on containerizing the backend portion of a Node.js-based TODO application. The backend service was located in the `todo-app/todo-backend` directory of the repository cloned in Exercise 12.1.

**Steps Completed**:
  1. **Explored the existing backend codebase** (`todo-app/todo-backend`) by reviewing the source files and the provided `README.md` to understand how the application works and how it should be started.
  2. **Tested the backend locally outside of a container to verify** that it starts correctly and serves the visit counter at `http://localhost:3000/`.
  3. Created a `Dockerfile` inside the `todo-app/todo-backend` directory with the appropriate instructions to:
    - Use an official Node.js base image.
    - Copy application files into the container.
    - Install dependencies.
    - Expose the necessary port.
    - Set the correct start command.
  4. Built the Docker image using:
    ```bash
    docker build -t todo-backend .
    ```
  5. Run the Docker container with port forwarding enabled:
    ```bash
    docker run -p 3000:3000 todo-backend
    ```
  6. **Verified that the application runs correctly in the container** by opening `http://localhost:3000` in the browser and ensuring the visit counter increased with each refresh.

This exercise demonstrated how to go from a working Node.js backend to a fully containerized version that behaves identically, laying the groundwork for containerizing more complex applications.

### 12.6: Docker compose 

This exercise introduced Docker Compose as a tool to simplify the process of running containerized applications with multiple services. The goal was to configure the previously containerized Node.js backend application (`todo-app/todo-backend`) to run using Docker Compose.

**Steps Completed**:
  1. **Created a** `docker-compose.yml` **file** inside the `todo-app/todo-backend` directory to define the Node.js backend service. The configuration included:
    - Building the backend from the local `Dockerfile`.
    - Mapping the container’s port `3000` to the host’s port `3000`.
    - Defining the container name for easier reference.
  2. Verified the configuration by running:
    ```bash
    docker-compose up
    ```
    - This started the application and exposed it at `http://localhost:3000`.
  3. **Tested the visit counter function** alityby opening the URL in a browser and ensuring that the counter increased with each page refresh.

This exercise demonstrated how Docker Compose can streamline container management by replacing long `docker run` commands with a concise YAML configuration. It also provided the foundation for orchestrating multi-container setups in later exercises.

### 12.7: Little bit of MongoDB coding

This exercise focused on extending the backend functionality of the Todo application by implementing two essential API routes using MongoDB. At this stage, MongoDB was containerized via Docker, while the backend was still running locally (outside of a container) to streamline development and debugging.

**Objective**:
Add support for retrieving and updating individual todo items in the Node.js backend by implementing the following REST API endpoints:
  - `GET /todos/:id` – Retrieves a single todo by its ID.
  - `PUT /todos/:id` – Updates a todo’s fields (e.g., `text`, `done`) by its ID.

**Steps Completed**:
  1. **Verified existing MongoDB configuration** from previous exercises and ensured the containerized database was running.
  2. **Implemented the missing route handlers** in the backend code located under `todo-app/todo-backend`:
    - Used Mongoose to query and update documents by `_id`.
    - Handled invalid or non-existent IDs gracefully.
  3. **Tested the new endpoints** with Postman and confirmed:
    - `GET /todos/:id` returned the correct todo item.
    - `PUT /todos/:id` updated the document and returned the updated version.
  4. **Confirmed the changes persisted** in the MongoDB container by querying the database using either the Express app or the Mongo CLI.

This exercise introduced essential CRUD capabilities to the application and deepened understanding of how Express and MongoDB work together in a containerized environment.

### 12.8: Mongo command-line interface

In this exercise, we interacted directly with a running MongoDB container using the Mongo Shell (CLI) to inspect and modify the database content manually.

**Steps Completed**:
1. **Started MongoDB container** using Docker Compose, as configured in `docker-compose.dev.yml`.
2. Accessed the running container with:
    ```bash
    docker exec -it <container_name> bash
    ```
3. Opened the Mongo Shell using:
    ```bash
    mongosh -u root -p example
    ```
4. Inspected the available databases with:
    ```js
    show dbs
    ```
5. Switched to the application's database:
    ```js
    use the_database
    ```
6. Listed available collections:
    ```js
    show collections
    ```
7. Queried existing todos from the `todos` collection:
    ```js
    db.todos.find({})
    ```
8. Inserted a new todo document:
    ```js
    db.todos.insertOne({
      text: "Increase the number of tools in my tool belt",
      done: false
    })
    ```
9. Verified that the new todo was successfully added by:
  - Re-querying the `todos` collection in the Mongo CLI.
  - Checking that the new todo appeared in the Express web application interface.
10. The entire interaction was recorded using the `script` command and saved to: `script-answers/exercise12_8.txt`

This exercise demonstrated how to interact with MongoDB from within a Docker container using the CLI, including querying and inserting documents manually.

### 12.9: Set up Redis for the project

In this exercise, Redis was added as a service to the existing development setup using Docker Compose. The goal was to prepare the infrastructure needed for tracking application metrics such as the number of created todos.

**Steps Completed**:
  1. **Consulted Redis documentation and Docker** Hub, determining the default port (`6379`) and required service configuration.
  2. **Updated the** `docker-compose.dev.yml` file in the `todo-backend` folder by adding Redis as a new service alongside MongoDB.
  3. **Restarted the backend** application and verified connectivity by passing the `REDIS_URL` environment variable (`redis://redis:6379`) during startup.
  4. **Tested Redis integration** by importing the Redis module (`require('../redis')`) inside the backend routes.
    - A successful silent import confirmed proper configuration.
    - Misconfiguration resulted in a connection error, aiding in debugging.

This setup was a prerequisite for enabling Redis-powered features in the next exercise.

### 12.10:

After setting up Redis, this exercise focused on enhancing the application by implementing a simple analytics feature: a counter that tracks how many todos have been created.

**Steps Completed**:
  1. **Hooked into the todo creation route** and used the `setAsync` and `getAsync` functions from the `redis` module to:
    - Increment a stored counter (`added_todos`) whenever a new todo is created.
  2. **Created a new API endpoint**: `GET /statistics`, which returns a JSON object showing the current value of `added_todos`:
    ```json
    {
      "added_todos": 0
    }
    ```
  3. **Tested the feature** using Postman and verified that the counter increments properly upon each POST request to create a todo.

This exercise demonstrated how Redis can be used for fast-access ephemeral data like usage statistics.

### 12.11:

This exercise demonstrated how to use the Redis command-line interface (`redis-cli`) to inspect and manipulate data stored in the Redis database, which is used by the backend application to track statistics.

**Steps Completed**:
1. Accessed the running Redis container using Docker:
    ```bash
    docker exec -it <redis_container_name> redis-cli
    ```
2. Listed available keys in the Redis database:
    ```bash
    KEYS *
    ```
3. Retrieved the current value of the statistics counter:
    ```bash
    GET <key_name>
    ```
4. Manually set the counter value to `9001` using the `SET` command:
    ```bash
    SET <key_name> 9001
    ```
5. Verified the updated counter value by refreshing the frontend at `http://localhost:3000/statistics` and ensuring the number displayed matched the expected value.
6. Created a new todo item using Postman (via a POST request to the `/todos` endpoint).
7. **Confirmed that the counter increased automatically** in Redis by rechecking the value with:
    ```bash
    GET <key_name>
    ```
8. Deleted the counter key to test automatic reinitialization by the app:
    ```bash
    DEL <key_name>
    ```
9. Added a new todo again and verified that the counter reappeared and updated as expected.
10. The entire debugging session was recorded using the `script` command and saved to: `script-answers/exercise12_11.txt`

This exercise showcased how Redis can be manually inspected and altered to debug issues related to application state, such as counters and cache, and how to validate backend behavior through CLI tools.

### 12.12: Persisting data in Redis

In this exercise, the goal was to ensure that Redis data (specifically the todo counter) is not lost between container restarts. By default, Redis stores its data in-memory, so persistence must be explicitly configured using Docker volumes.

**Steps Completed**:
  1. **Verified default behavior**:
    - Started the development environment using `docker compose -f docker-compose.dev.yml up`.
    - Created a new todo and confirmed that the counter (`added_todos`) was incremented.
    - Brought the environment down using `docker compose -f docker-compose.dev.yml down`.
    - Brought it back up and confirmed that the counter was reset to `0`, proving that Redis data is not persisted by default.
  2. **Enabled persistence by adding a volume**:
    - Edited `todo-app/todo-backend/docker-compose.dev.yml` to define a named volume for Redis:
      ```yaml
      services:
        redis:
          image: redis
          volumes:
            - redis-data:/data
      volumes:
        redis-data:
      ```
    - Redis stores persistent data by default in the `/data` directory, so mounting a volume there ensures durability.
  3. **Retested after enabling the volume**:
    - Recreated the environment and added a todo to increment the counter.
    - Brought the services down and up again using the same Docker Compose commands.
    - Verified that the counter retained its value, confirming successful data persistence.

This exercise demonstrated how to use Docker volumes to make Redis data survive container restarts, an essential aspect for production-ready systems.

### 12.13: Todo application frontend

This exercise focused on containerizing the frontend part of the todo application and ensuring communication between the frontend and backend.

**Steps Completed**:
  1. **Run the frontend outside a container**:
    - Navigated to `todo-app/todo-frontend`.
    - Reviewed the README file for setup instructions.
    - Run the development server locally to confirm that the frontend successfully communicates with the backend (which was also running outside a container).
  2. **Containerized the frontend**:
    - Created a `Dockerfile` inside `todo-app/todo-frontend` using a multi-stage build to install dependencies, build the Vite project, and serve it with a lightweight HTTP server.
    - Used the `ENV` instruction to define the `VITE_BACKEND_URL` environment variable, which allows the frontend to connect to the backend API.
    - Ensured that the `VITE_BACKEND_URL` was set before the build step, as Vite statically embeds it during compilation. This was a crucial requirement for the application to work correctly.
  3. **Tested the containerized frontend**:
    - Built and ran the frontend Docker image.
    - Verified in the browser that the frontend loads correctly and interacts with the backend API through the specified `VITE_BACKEND_URL`.

This exercise demonstrated proper handling of build-time environment variables and highlighted the importance of build order in frontend projects using Vite.

### 12.14: Testing during the build process

This task explored how to integrate testing into Docker image builds using multi-stage builds, enabling automatic test execution during the container build process.

**Steps Completed**:
  1. **Refactored the frontend code**:
    - Extracted a new `Todo` component that represents a single todo item from the application.
    - Ensured the component was reusable and covered only presentational logic.
  2. **Wrote a test for the new component**:
    - Created a unit test using a test framework compatible with the project (e.g., Jest or Vitest).
    - Verified that the test runs successfully in the local development environment.
  3. **Integrated tests into the Docker build process**:
    - Added a new build stage in the Dockerfile dedicated to running tests before proceeding to the actual production build.
    - Ensured the build fails if any test fails, leveraging the benefit of multi-stage Docker builds for automated validation.

This exercise emphasized test automation within the CI/CD pipeline and introduced the idea of validating container-specific functionality during image creation.

### 12.15: Set up a frontend development environment

This exercise focused on setting up a Docker-based development environment for the `todo-frontend`, enabling live development inside a container using volumes.

**Steps Completed**:
  1. **Created a Docker Compose file**:
    - Added a new file at `todo-app/todo-frontend/docker-compose.dev.yml`.
    - Defined a service for the `todo-frontend` using a development-friendly base image (e.g., `node:20-alpine`).
  2. **Configured volumes for live development**:
    - Mapped the frontend source code directory from the host machine to the container using a volume.
    - Used another volume to persist `node_modules` inside the container to avoid conflicts with host dependencies.
    - **Example volume mapping**:
      ```yaml
      volumes:
        - .:/app
        - /app/node_modules
      ```
  4. **Enabled hot reloading**:
    - Used `npm run dev` or `vite` as the container’s command to start the Vite development server with hot module replacement (HMR).
    - Ensured that file changes on the host machine were reflected inside the container and automatically reloaded in the browser.
  5. **Tested the development setup**:
    - Confirmed that the app loaded correctly at `http://localhost:5173` (or the configured Vite port).
    - Made code changes and verified that updates were reflected immediately without rebuilding or restarting the container.

This setup allows for efficient frontend development entirely within a Docker environment, while maintaining a native-like workflow.

### 12.16: Run todo-backend in a development container

This exercise focused on setting up a development container for the `todo-backend` using Docker Compose, volumes, and Nodemon. The goal was to enable live backend development inside the container, with automatic restarts on file changes.

**Steps Completed**:
  1. **Created a development Dockerfile**:
    - Added a new file at `todo-app/todo-backend/dev.Dockerfile`.
    - Used `node:20-alpine` as the base image.
    - Installed development dependencies including `nodemon`.
    - Set `CMD ["npm", "run", "dev"]` to launch the backend with Nodemon.
  2. **Updated Docker Compose**:
    - Modified `todo-app/todo-backend/docker-compose.dev.yml`.
    - Added the `server` service with the following configuration:
      - **Volumes**:
        ```yaml
        volumes:
          - .:/usr/src/app
          - /usr/src/app/node_modules
        ```
      - **Ports**:
        ```yaml
        ports:
          - "3000:3000"
        ```
      - **Build**:
        ```yaml
        build:
          context: .
          dockerfile: dev.Dockerfile
        ```
      - **Environment Variables**:
        Defined `REDIS_URL` and `MONGO_URL` with proper internal service names as hostnames:
        ```yaml
        environment:
          - REDIS_URL=redis://redis:6379
          - MONGO_URL=mongodb://the_username:the_password@mongo:27017/the_database
        ```
  3. **Tested live development features**:
    - Started the backend using `docker compose -f docker-compose.dev.yml up`.
    - Made changes to the backend code and verified that Nodemon automatically restarted the server.
    - Confirmed correct communication with the `mongo` and `redis` services using logs and application behavior (e.g., todo creation and visit counter updates).

This setup enables productive backend development inside a container with full access to MongoDB and Redis services, simulating a real-world containerized development environment.

### 12.17: Set up an Nginx reverse proxy server in front of todo-frontend

This exercise introduces Nginx as a reverse proxy server for our application. The goal was to configure Nginx to serve the React frontend through a single entry point accessible from the browser.

**Steps Completed**:
  1. **Created a new project-level Docker Compose and Nginx configuration**:
    - Added a new file: `todo-app/docker-compose.dev.yml`
    - Added an Nginx configuration file: `todo-app/nginx.dev.conf`
  2. **Defined `nginx` and `todo-frontend` services in the Compose file**:
    - The frontend was built using a custom `dev.Dockerfile`.
    - No ports were exposed from the frontend container.
    - Nginx was set to forward requests to the frontend container.
  3. **Confirmed frontend routing**:
    - Accessing `http://localhost:8080` served the frontend through Nginx.
    - Confirmed that the React source code is delivered from the frontend container but executed in the browser.

### 12.18: Configure the Nginx server to be in front of todo-backend

In this step, Nginx was also configured to proxy API calls to the backend (Express server), making it the single entry point for both the frontend and backend.

**Steps Completed**:
  1. **Added the** `todo-backend` **service to** `todo-app/docker-compose.dev.yml`:
    - Used a development image built from `dev.Dockerfile`.
    - Mounted backend source code as a volume.
    - No exposed ports were defined.
  2. **Updated Nginx configuration** (`nginx.dev.conf`):
    - Added a new `location /api/` block that proxies requests to the backend container.
    - Used `proxy_pass http://server:3000/` (with a trailing slash) to ensure the `/api` path is removed before forwarding.
  3. **Tested backend proxying**:
    - Verified that requests to `http://localhost:8080/api/todos` were correctly proxied to the backend and returned valid data.

### 12.19: Connect the services, todo-frontend with todo-backend

This final exercise was about fully integrating the development environment using the reverse proxy setup.

**Steps Completed**:
  1. **Connected frontend and backend through Nginx**:
    - Ensured that Nginx was the only exposed service (`localhost:8080`).
    - Confirmed that both frontend and backend containers had no exposed ports.
    - Nginx forwarded `/` requests to the frontend and `/api/` requests to the backend.
  2. **Set correct `VITE_BACKEND_URL` in frontend**:
    - Used `VITE_BACKEND_URL=http://localhost:8080/api` before building the frontend image.
    - Ensured the app fetched todos and posted new todos through the proxied API path.
  3. **Verified development functionality**:
    - Confirmed all app features worked through the browser.
    - Changes to source files were immediately reflected in the browser after refresh.
    - Verified via browser DevTools that API requests were made to `/api/...` through Nginx (not directly to backend container).
  4. **Validated setup without exposing ports**:
    - Confirmed correct functionality using only one exposed port (from the Nginx container).

This setup now mirrors a real-world local development stack with React + Express behind Nginx, simulating production-like routing behavior.

### 12.20:

This exercise focused on preparing a production-ready deployment environment for the todo application, including all required services in a single `docker-compose.yml` file.

**Steps Completed**:
  1. **Created a new production-level** `docker-compose.yml` **in the** `todo-app` **directory**.
  2. **Defined all necessary services**:
    - `nginx`: Used to serve frontend files and proxy API requests.
    - `todo-frontend`: Built from the production `Dockerfile`, with `VITE_BACKEND_URL` set to Nginx.
    - `todo-backend`: Built using its production `Dockerfile`, started in production mode.
    - `mongodb` and `redis`: Official Docker images used.
  3. **Used appropriate configurations and separation**:
    - The production configuration was kept separate from the development one.
    - The app structure now looks like this:
    ```
    todo-app/
    ├── todo-frontend
    ├── todo-backend
    ├── nginx.dev.conf
    ├── docker-compose.dev.yml
    ├── nginx.conf          ← Production Nginx config
    └── docker-compose.yml  ← Production Docker Compose
    ```
  4. **Verified full functionality**:
    - The app served correctly at `http://localhost` via Nginx.
    - The frontend was built before containerization.
    - API routes worked through the `/api` path.
    - All services worked together using Docker networking.

### 12.21:

In this task, a personal full stack application was containerized for development, following a similar structure and methodology used in the todo app.

**Steps Completed**:
  1. **Structured the app according to the assignment**:
  ```
  todo-app/
  ├── todo-frontend/
  │   └── dev.Dockerfile
  ├── todo-backend/
  │   └── dev.Dockerfile
  ├── nginx.dev.conf
  └── docker-compose.dev.yml
  ```
  2. **Configured** `docker-compose.dev.yml`:
    - Defined services for the frontend, backend, and Nginx.
    - Volumes enabled live development for both frontend and backend.
    - Used `dev.Dockerfiles` to install dev dependencies and tools like Nodemon or Vite.
  3. **Verified the local development setup**:
    - The frontend connected to the backend via Nginx.
    - Code changes reflected instantly via hot reload or app restart.
    - Development logs were visible in the terminal.

### 12.22:

Finally, the same personal application was prepared for production, building on the previous development environment.

**Steps Completed**:
  1. **Expanded the project structure to include production configuration**:
  ```
  todo-app/
  ├── todo-frontend/
  │   ├── dev.Dockerfile
  │   └── Dockerfile
  ├── todo-backend/
  │   ├── dev.Dockerfile
  │   └── Dockerfile
  ├── nginx.dev.conf
  ├── nginx.conf
  ├── docker-compose.dev.yml
  └── docker-compose.yml
  ```
  2. **Created production Dockerfiles for both frontend and backend**:
    - Used multi-stage builds to optimize image size.
    - Applications were started in production mode (`npm run build` and `npm start`).
  3. **Configured production** `docker-compose.yml`:
    - All containers (frontend, backend, nginx, DBs) were included.
    - Nginx served as a reverse proxy for all traffic.
    - Environment variables for backend services (e.g., DB URLs) were injected.
  4. **Verified production behavior**:
    - The app was available at `http://localhost` via Nginx.
    - No development tools were present.
    - Static frontend files were served properly.
    - Backend routes were proxied through Nginx.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open-containers
```

2. Navigate to the project directory:

```bash
cd full-stack-open-containers/todo-app
```

3. Start the development environment:

```bash
docker compose -f docker-compose.dev.yml up
```

4. Stop and remove containers (volumes persist):

```bash
docker compose -f docker-compose.dev.yml down
```

5. Stop and remove containers and volumes (reset Redis/MongoDB data):

```bash
docker compose -f docker-compose.dev.yml down -v
```

6. Manually build the frontend or backend for development:

```bash
# Frontend
docker build -t todo-frontend-dev -f todo-frontend/dev.Dockerfile todo-frontend

# Backend
docker build -t todo-backend-dev -f todo-backend/dev.Dockerfile todo-backend
```

7. Build the frontend for production
Important: The `VITE_BACKEND_URL` must be set before running the build:
```bash
VITE_BACKEND_URL=http://localhost/api \
docker build -t todo-frontend-prod -f todo-frontend/Dockerfile todo-frontend
```

8. Run frontend tests during the image build (multi-stage build):

```bash
docker build -t todo-frontend-test -f todo-frontend/Dockerfile .
```

9. Running the Production Environment

```bash
docker compose -f docker-compose.yml up
```

10. Stop the production environment:

```bash
docker compose -f docker-compose.yml down
```

## 🧠 Notes
  - **redis-cli** is a powerful tool that enables direct access to a Redis instance, making it easier to verify application logic and debug data-related issues without modifying the app’s code.
  - Redis stores key-value pairs; using commands like `GET`, `SET`, and `DEL` allows manual inspection and modification of the stored data.
  - The key used to track the number of todos was dynamically created by the application. It is important to identify it using the `KEYS *` command before running any further operations.
  - When the counter key was deleted with `DEL`, the application correctly recreated it upon the next todo creation. This confirms robust error-handling and fallback mechanisms in the app.
  - Redis, in this setup, is used for **caching and statistics tracking**, not for persistent storage. Resetting or modifying values in Redis does not affect the actual todo data stored in MongoDB.
  - This exercise emphasized the importance of **containerized service introspection** using CLI tools (`docker exec`, `redis-cli`), which is a common practice in real-world DevOps workflows.
  - Using tools like **Postman** in combination with CLI tools can provide a full picture of how data flows through the system — from frontend, through API, to storage/cache layers.