# Full Stack Open 2024 - Part 5: Bloglist Application

This project is a frontend React application developed as part of the Full Stack Open course (Part 5). It interfaces with a backend API to enable user authentication and full CRUD operations on blog entries. The application supports persistent login, conditional rendering, notifications, and user-specific access to blog deletion.

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
part5/
├── bloglist-e2e-tests
└── bloglist-frontend/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── Blog.jsx
    │   │   ├── BlogForm.jsx
    │   │   ├── Notification.jsx
    │   │   └── Togglable.jsx
    │   ├── services/
    │   │   ├── blogs.js
    │   │   └── login.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── tests/
    │   └── Blog.test.js
    ├── .eslintrc.cjs
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    ├── package.json 
    ├── README.md
    └── vite.config.js
```

All course materials for "Blog List" exercises **5.1.–5.12.** are located inside the `bloglist-frontend` folder.

## ✅ Exercises Overview

During the development of the project in Part 5, the following tasks were performed.

### 5.1: Blog List Frontend, step 1

- The application begins with a login form.
- On successful authentication, the backend returns a token, which is stored in state.
- Logged-in users see a list of blogs and their name.
- Conditional rendering is used to show either the login form or the app content.

### 5.2: Blog List Frontend, step 2

- Implemented localStorage to persist login sessions.
- On page reload, user data is restored from localStorage.
- Logout button removes user data from both state and localStorage.

### 5.3: Blog List Frontend, step 3

- Logged-in users can submit a form to create a new blog.
- The new blog is immediately added to the UI upon success.

### 5.4: Blog List Frontend, step 4

- Global notification system displays messages for:
  - Successful blog creation
  - Failed login attempts
- Messages auto-dismiss after a few seconds.

### 5.5: Blog List Frontend, step 5

- Blog creation form is hidden by default.
- Clicking "create new blog" reveals the form.
- The form hides again after successful blog submission.

### 5.6: Blog List Frontend, step 6

- Blog creation logic was separated into a `BlogForm` component.
- The component is fully self-contained and handles its own state.

### 5.7: Blog List Frontend, step 7

- Each blog entry now has a "view" button to toggle details.
- Includes title, author, URL, number of likes, and the name of the user who added it.
- Details are hidden by default.

### 5.8: Blog List Frontend, step 8

- Users can click the "like" button to increment the blog’s like count.
- PUT request is sent to the backend with updated blog data.
- The backend is updated to support `user` as an ID reference.

### 5.9: Blog List Frontend, step 9

- After a like is added, blog details previously lost the user name.
- The issue was resolved by fetching or maintaining full user information when updating blogs.

### 5.10: Blog List Frontend, step 10

- Blogs are displayed in descending order of likes.
- Uses JavaScript’s `array.sort()` method to dynamically order the blogs.

### 5.11: Blog List Frontend, step 11

- Each blog post has a "remove" button visible only to the user who added it.
- Clicking "remove" prompts a confirmation via `window.confirm()`.
- If confirmed, the blog is deleted both from the backend and the frontend state.

### 5.12: Blog List Frontend, step 12

- ESLint configuration was added and integrated into the project.
- All linter warnings/errors were resolved.
- PropTypes were defined for the `Blog` component to ensure type safety.

### 5.13: Blog List Tests, step 1

- A unit test verifies that a `Blog` component renders only:
  - **Title**
  - **Author**
- It confirms that URL and likes are not visible by default.
- To support this, elements in the `Blog` component were assigned distinct CSS class names (e.g., `.blog-header`, `.blog-details`).

```jsx
expect(container.querySelector('.blog-header')).toHaveTextContent('React patterns Michael Chan');
expect(container.querySelector('.blog-details')).not.toBeVisible();
```

### 5.14: Blog List Tests, step 2

- A test ensures that clicking the "view" button on a `Blog` component:
  - Reveals the URL
  - Reveals the likes
- The test uses `userEvent` to simulate the click and then checks that hidden elements become visible.

```jsx
const button = screen.getByText('view');
await user.click(button);

expect(screen.getByText('https://reactpatterns.com')).toBeVisible();
expect(screen.getByText('likes')).toBeVisible();
```

### 5.15: Blog List Tests, step 3

- The test verifies that clicking the "like" button twice results in two calls to the handler function passed via props.
- Jest’s mock function (`jest.fn()`) is used to simulate the handler.
- Uses `userEvent.click` twice and confirms call count.

```js
expect(mockLikeHandler.mock.calls).toHaveLength(2);
```

### 5.16: Blog List Tests, step 4

- The test validates that the `BlogForm` component:
  - Calls the provided event handler
  - Passes the correct form data (title, author, URL)
- Uses `userEvent.type()` to fill the inputs and submits the form.
- Asserts that the handler was called once with an object containing:

```js
{
  title: 'New Blog',
  author: 'Test Author',
  url: 'https://example.com'
}
```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/realNormanik/full-stack-open.git
```

2. Navigate to the project directory:

```bash
cd full-stack-open/part5/bloglist-frontend
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development frontend:

```bash
npm run dev
```

The application from Part 4 will be available at [http://localhost:5173](http://localhost:5173) and server is available at [http://localhost:3003](http://localhost:3003).

## 🧠 Notes

- The application is built with clean separation of concerns and a modular component architecture.
- All important user interactions are backed by HTTP requests and state updates.
- Functional components with hooks are used throughout.
- The app gracefully handles error states and invalid inputs.