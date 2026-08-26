# Full Stack Open 2024 - Part 12: Containers

This project is a fully containerized Todo Application developed as part of the Full Stack Open DevOps Part 12. It consists of a React frontend, Express backend, MongoDB database, Redis-based statistics counter, and an Nginx reverse proxy. Both development and production environments are supported using Docker Compose.

## 📜 Certificate of Completion
With the successful completion of assignments 12.1. through 12.21. of the tenth part of the Full Stack Open course, I received the following certificate from the University of Helsinki:

Containers Module Certificate: [View Certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fs-containers/en/650e207f50c96ddeb4e1628bef3bcfa4)

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
full-stack-open-container/
├── script-answers
└── todo-app/
    ├── docker-compose.dev.yml
    ├── docker-compose.yml
    ├── nginx.conf
    ├── nginx.dev.conf
    ├── todo-backend
    └── todo-frontend/
        ├── nginx/
        │   └── default.conf
        ├── public/
        │   └── vite.svg
        ├── src/
        │   ├── components/
        │   │   ├── Todo.jsx
        │   │   └── Todo.test.jsx
        │   ├── Todos/
        │   │   ├── Form.jsx
        │   │   ├── List.jsx
        │   │   └── TodoView.jsx
        │   ├── utils/
        │   │   └── apiClient.js
        │   ├── App.css
        │   ├── App.jsx
        │   └── main.jsx
        ├── .eslintrc.cjs
        ├── .gitignore
        ├── dev.Dockerfile
        ├── docker-compose.dev.yml
        ├── docker-compose.yml
        ├── Dockerfile
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── README.md
        └── vite.config.js
```

# React application

This application is created with [Vite](https://vitest.dev/).

Install dependencies with `npm install`

You can run the application in development mode with `npm run dev`

You can build static files for production release with `npm run build`

## Environment variables

Use env VITE_BACKEND_URL to set where the backend for this application is