# Full Stack Open 2024 - Part 5: Blog List Testing

This project contains comprehensive end-to-end (E2E) tests for the Blog List application, using both Playwright and Cypress as test automation frameworks. It verifies core user interactions such as authentication, blog creation, liking, and deletion, including access control and UI ordering logic.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part5/
├── bloglist-frontend
└── bloglist-e2e-tests/
    ├── cypress/
    │   ├── fixtures/
    │   │   └── example.json
    │   ├── integration/
    │   │   └── blog.spec.js
    │   └── support/
    │       ├── commands.js
    │       └── e2e.js
    ├── test-results/
    │   └── .last-run.json
    ├── .gitignore
    ├── blog.test.js
    ├── cypress.config.js
    ├── package-lock.json
    ├── package.json 
    └── README.md
```

All course materials for "Blog List" exercises **5.16.–5.23.** are located inside the `bloglist-e2e-tests` folder.

## ✅ Exercises Overview

During the development of the project in Part 5, the following tasks were performed.

### 5.17: Blog List End To End Testing, step 1

- Confirms that the login form is visible when the app loads.
- Uses either Playwright or Cypress to navigate to the homepage and check for elements like `username` and `password`.

### 5.18: Blog List End To End Testing, step 2

- Sets up test users in the backend using API calls.
- Empties the database before each test using the `/api/testing/reset` endpoint.
- Includes:
  - ✅ Successful login with correct credentials.
  - ❌ Failed login with incorrect credentials.
  - 🔴 Error message style check for failed login (Cypress only).

### 5.19: Blog List End To End Testing, step 3

- Ensures that a **logged-in** user can:
  - Open the blog creation form.
  - Fill in blog details.
  - Submit the form.
  - See the newly created blog listed in the UI.

### 5.20: Blog List End To End Testing, step 4

- Verifies that a blog can be **liked**, and the like count increments.
- In Playwright, this may require waiting for the DOM to update between clicks.

### 5.21: Blog List End To End Testing, step 5

- Confirms that:
  - The user who created the blog can see the **"Remove"** button.
  - Clicking it successfully deletes the blog from the list.

### 5.22: Blog List End To End Testing, step 6

- Verifies that:
  - Only the **creator** of a blog can see the **"Remove"** button.
  - Other users **do not see** the delete option.

### 5.23: Blog List End To End Testing, step 7

- Adds multiple blogs with different numbers of likes.
  - Checks that the blogs appear in descending order by number of likes.
  - Uses `cy.get('.blog').eq(index)` to assert proper ordering.

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part5/bloglist-e2e-tests
```

3. Install the dependencies:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

4. Start the test:

```bash
npm run test
```

## 🧠 Notes

- Proper test isolation using database reset is crucial.
- Test reliability often requires waiting for the UI to update after interactions.
- Simulating authenticated sessions can speed up tests.
- Clear separation of permissions (e.g., delete visibility) is easily testable via E2E.