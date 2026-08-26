# Full Stack Open 2024 - Rate Repository App

The project is a React Native application for managing and interacting with repositories. Users can view a list of repositories with their details, sign in to access certain functionalities, and navigate between various views using tabs. This app is built with Expo and integrates Apollo Client for fetching data from a GraphQL API. The sign-in process uses mutations to authenticate users, and the app is designed to handle different environments and platforms with platform-specific fonts.

## 📜 Certificate of Completion
With the successful completion of assignments 10.1. through 10.27. of the tenth part of the Full Stack Open course, I received the following certificate from the University of Helsinki:

React Native Module Certificate: [View Certificate](https://studies.cs.helsinki.fi/stats/api/certificate/fs-react-native-2020/en/33a43a06dd7b1ea3d52f403b851661f9)

## 🗂️ Project Structure

The project is organized following the recommended structure for Full Stack Open submissions:

```
full-stack-open-rate-repository-app/
├── assets/
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash-icon.png
├── graphql-server/
│   ├── data.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── resolvers.js
│   └── schema.js
├── src/
│   ├── components/
│   │   ├── AppBar.jsx 
│   │   ├── CreateReview.jsx
│   │   ├── Main.jsx
│   │   ├── MyReviews.jsx
│   │   ├── RepositoryItem.jsx
│   │   ├── RepositoryList.jsx
│   │   ├── RepositoryListHeader.jsx
│   │   ├── ReviewItem.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignOut.jsx
│   │   ├── SignUp.jsx
│   │   ├── SingleRepository.jsx
│   │   └── Text.jsx
│   ├── graphql/
│   │   ├── mutations.js
│   │   └── queries.js
│   ├── hooks/
│   │   ├── useApolloClient.js
│   │   ├── useRepositories.js
│   │   └── useSignIn.js
│   ├── utils/
│   │   ├── authStorage.js
│   │   ├── styles.js
│   │   ├── theme.js
│   │   └── utils.js
│   └── client.js
├── .gitignore
├── app.config.js
├── App.js
├── app.json
├── eslint.config.mjs
├── index.js
├── LICENSE
├── package-lock.json
├── package.json 
└── README.md
```

All course materials for "BMI Calculator" exercises **10.1.–10.27.** are located inside the `full-stack-open-rate-repository-app` folder.

## ✅ Exercises Overview

This section summarizes each implemented feature or requirement from the course:

### 10.1: initializing the application

In this exercise, the application was initialized using Expo CLI, a tool for building React Native apps. The development environment was set up, with a focus on flexibility, allowing the use of either an emulator or Expo’s mobile app to run the application. Both methods were explored to determine which provided the best development experience.

1. **Expo Initialization:**
  The application was initialized using the `expo init` command. For this task, the project was named `rate-repository-app`, though the name could be adjusted based on personal preferences.

 2. **Setting Up Development Environment:**
  Two options for running the application were considered:
  - **Emulator**: An Android or iOS emulator was set up on the development machine to simulate the mobile experience directly on the computer.
  - **Expo Mobile App**: The Expo Go app was installed on a mobile device, providing a convenient way to preview the app live on a physical device.

  Both options were tested, allowing the choice of the most suitable environment for future development.

3. **GitHub Repository Setup:**
  - A new GitHub repository was created to house the project code.
  - The repository was named after the application, i.e., `rate-repository-app`.
  - For submission verification, the GitHub user `mluukkai` was added as a collaborator to the repository if it was private.

4. **Git Initialization and Commit:**
  - Inside the project directory, `git init` was run to initialize the project as a Git repository.
  - The remote GitHub repository was added using the command:
    ```bash
    git remote add origin git@github.com:<YOURGITHUBUSERNAME>/<NAMEOFYOUR_REPOSITORY>.git
    ```
    (replacing the placeholders with the actual username and repository name).
  - Finally, changes were committed and pushed to GitHub to ensure proper version control.

By the end of this exercise, the project was successfully initialized and committed to a GitHub repository, ready for further development. The mobile application is now set up to run and develop on the preferred platform, and the project is tracked in version control for collaboration and submission purposes.

### 10.2: setting up the ESLint

In this exercise, ESLint was set up to enable linting in the project, ensuring consistent code quality and style throughout development. ESLint is a static code analysis tool used to identify problematic patterns in JavaScript code, helping maintain cleaner and more readable code.

1. **Installing ESLint**:
  - ESLint was installed as a development dependency by running the following command:
    ```bash
    npm install eslint --save-dev
    ```
  - Additionally, an ESLint configuration file was created by running:
    ```bash
    npx eslint --init
    ```

This guided setup created a configuration file, `.eslintrc.js`, and provided options to tailor the linting rules according to the project’s needs.
        
2. **Setting Up ESLint for the Project**:
  - The configuration was tailored to the project’s JavaScript (or TypeScript, if applicable) environment. This included choosing appropriate rule sets (e.g., Airbnb or Standard style) and configuring the parser options to support React or other project-specific frameworks.
  - The `.eslintignore` file was created to ensure that certain files and folders (such as build artifacts or `node_modules`) were excluded from the linting process.
        
3. **Integrating ESLint with the Editor**:
  - ESLint was integrated with the editor (e.g., VS Code) using the ESLint plugin, enabling real-time linting feedback during development.
  - This integration helps detect and fix issues as the code is being written, ensuring code quality is maintained at all times.

4. **Running Linter Checks**:
  - The linting command `npm run lint` was added to the `scripts` section of the `package.json` file:
    ```json
    "scripts":  {  "lint":  "eslint ."  }
    ```
  - Running `npm run lint` would now execute ESLint and check the project for linting errors and warnings across the entire codebase.
        
5. **Finalizing and Pushing Code to GitHub**:
  - With ESLint successfully integrated and linting checks set up, the code was pushed to the GitHub repository to ensure version control.
  - After ensuring everything was working as expected, the exercises for this section were marked as complete in the exercise submission system.

By completing this exercise, the project is now equipped with a reliable linting process that helps catch errors early, improves code quality, and enhances team collaboration. The code was committed to GitHub, and the task was submitted for review.

### 10.3: the reviewed repositories list

In this exercise, we implemented the first version of the reviewed repositories list, displaying key details for each repository, such as its full name, description, language, number of forks, number of stars, rating average, and number of reviews. React Native’s `FlatList` component was used to render the list efficiently.

1. **Creating the `RepositoryList` and `RepositoryItem` Components**:
  - Two components were created: `RepositoryList` and `RepositoryItem`.
  - **RepositoryList**: Displays the list of repositories using React Native’s `FlatList` component.
  - **RepositoryItem**: Represents an individual repository item in the list.

2. **Setting Up the Repository List**:
  - The `repositories` array was defined in the `RepositoryList.jsx` file, containing sample data for repositories:
    ```js
    const repositories = [
      {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4'
      }, // More repositories...
    ];
    ```

3. **Using `FlatList` to Render the List**:
  - The `FlatList` component was used to render the list of repositories. The data for the list comes from the `repositories` array, and `ItemSeparatorComponent` was added to provide spacing between items:
    ```js
    const  ItemSeparator = () => <View  style={styles.separator} />;
    ```
  - In the `RepositoryList` component, the `FlatList` component renders each repository item by passing the `renderItem` prop a function that returns a `RepositoryItem` component:
    ```js
    const  RepositoryList = () => {
      return (
        <FlatList
          data={repositories}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <RepositoryItem repository={item} />}
        />
      );
    };
    ```
        
4. **Creating the `RepositoryItem` Component**:
  - The `RepositoryItem.jsx` file was created to display the details of a single repository. It takes a `repository` prop and displays key details such as the repository name, description, language, forks count, stars count, rating average, and number of reviews.        
  - The `RepositoryItem` component uses the `Image` component to display the repository owner’s avatar and the `Text` component to display textual information:
    ```js
    const RepositoryItem = ({ repository }) => (
      <View style={styles.container}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <Text style={styles.fullName}>{repository.fullName}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        <Text style={styles.language}>{repository.language}</Text>
        <Text style={styles.forks}>Forks: {repository.forksCount}</Text>
        <Text style={styles.stars}>Stars: {repository.stargazersCount}</Text>
        <Text style={styles.rating}>Rating: {repository.ratingAverage}</Text>
        <Text style={styles.reviews}>Reviews: {repository.reviewCount}</Text>
      </View>
    );
    ```

5.  **Styling the Components**:
  - The components were styled using React Native’s `StyleSheet.create()` method to ensure that the repository list and individual items are displayed neatly. For example:
    ```js
    const styles = StyleSheet.create({
      container: { padding: 10 },
      separator: { height: 10 },
      fullName: { fontWeight: 'bold' },
      description: { color: 'gray' },
      language: { fontSize: 12 },
      forks: { fontSize: 12 },
      stars: { fontSize: 12 },
      rating: { fontSize: 12 },
      reviews: { fontSize: 12 },
      avatar: { width: 50, height: 50, borderRadius: 25 },
    });
    ```

6.  **Integrating the RepositoryList in the Main Component**:
  - The `RepositoryList` component was imported and rendered inside the `Main.jsx` file to display the list of repositories on the screen:
    ```js
    import RepositoryList from './components/RepositoryList';

    const Main = () => (
      <View>
        <RepositoryList />
      </View>
    );
    ```

8.  **Testing and Finalizing**:
  - The application was tested to ensure that the repository list rendered correctly, displaying all relevant details for each repository. The list was scrollable, and the repository items were separated by a spacer (`ItemSeparator`).
  - Once verified, the code was committed to GitHub, and the exercise was marked as complete.

By the end of this exercise, the project successfully displayed a list of repositories with all the necessary details, using React Native's `FlatList` component for efficient rendering.

### 10.4: the app bar

In this exercise, we created the App Bar, a component that will serve as a navigation element for switching between different views in the application. This app bar includes a tab labeled "Repositories," which allows users to navigate between different views. The component also ensures that the status bar doesn't overlap the content by accounting for the height of the status bar.

1. **Creating the `AppBar.jsx` Component**:
  - We created the `AppBar` component inside the `components` folder. The component structure ensures proper display by using `Constants.statusBarHeight` to account for the status bar’s height, preventing overlap with the content:
    ```jsx
    import { View, StyleSheet } from 'react-native';
    import Constants from 'expo-constants';

    const styles = StyleSheet.create({
      container: { paddingTop: Constants.statusBarHeight, backgroundColor: '#24292e' }, // App Bar background color padding: 10
    });
        
    const AppBar = () => {
      return <View style={styles.container}>{/* Tab components will go here */}</View>;
    };

    export  default  AppBar;
    ```

2. **Designing the Tab Component**:
  - Inside the `AppBar`, we added a pressable tab that simply displays the text "Repositories." The tab is made interactive using the `Pressable` component, though no action is required for the `onPress` event at this point:
    ```jsx
    import { Pressable, Text } from 'react-native';

    const AppBar = () => {
      return (
        <View style={styles.container}>
          <Pressable>
            <Text style={{ color: 'white', fontSize: 18 }}>Repositories</Text>
          </Pressable>
        </View>
      );
    };
    ```

3. **Integrating the AppBar in the Main Component**:
  - The `AppBar` component was added to the `Main.jsx` file, ensuring it sits at the top of the screen:
    ```jsx
    import AppBar from './components/AppBar';

    const Main = () => {
      return(
        <View style={{ flex: 1 }}>
          <AppBar />
          {/* Other components */}
        </View>
      );
    };
    ```

4.  **Removing Margin for Main Component**:
  - Since the `AppBar` now accounts for the status bar height, we removed the previously added `marginTop` style in the `Main.jsx` file.

5.  **Enhancing the App Bar Design**:
  - We set the background color of the app bar to `#24292e` (a dark shade), though the color can be easily changed by modifying the `backgroundColor` style. We also suggested adding the background color to a theme configuration for future flexibility.

7. **Future Scalability**:
  - To facilitate the addition of new tabs in the future, we proposed creating a separate `AppBarTab` component to manage each tab's functionality and styling.

By the end of this exercise, we successfully created a clean and functional app bar that serves as the top navigation bar for the app, with a simple tab that can be extended later for more views.

### 10.5: polished reviewed repositories list

In this exercise, we focused on improving the visual appearance and functionality of the reviewed repositories list. The `RepositoryItem` component was updated to include the repository author's avatar image, improve the display of counts (e.g., stars and forks), and enhance the overall look of the list. The final design features a more polished and user-friendly layout.

1. **Updating the `RepositoryItem` Component**:
  - The `RepositoryItem` component was modified to display the repository author’s avatar image. This was done using React Native’s `Image` component:
    ```jsx
    import { Image, Text, View, StyleSheet } from 'react-native';

    const RepositoryItem = ({ repository }) => (
      <View style={styles.container}>
        <Image source={{ uri: repository.ownerAvatarUrl }} style={styles.avatar} />
        <Text style={styles.fullName}>{repository.fullName}</Text>
        <Text style={styles.description}>{repository.description}</Text>
        {/* Other repository details */}
      </View>
    );
    ```

2. **Formatting Counts with 'k' Suffix**:
  - Forks and stars counts of 1000 or more were formatted to show in thousands, with one decimal place, followed by a "k" suffix. For example, 8439 forks are displayed as "8.4k":
    ```jsx
    const formatCount = (count) => {
      if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
      };

      return count.toString();
    };

    const RepositoryItem = ({ repository }) => (
      <View style={styles.container}>
        <Text style={styles.forks}>Forks: {formatCount(repository.forksCount)}</Text>
        <Text style={styles.stars}>Stars: {formatCount(repository.stargazersCount)}</Text>
        {/* Other details */}
      </View>
    );
    ```

3. **Polishing the Overall Look**:
  - The `RepositoryItem` component’s background color was set to white to create contrast with the `Main` component’s background color (`#e1e4e8`).
  - The language tag’s background color was set to `#0366d6`, matching the theme configuration's `colors.primary` value:
    ```js
    const styles = StyleSheet.create({
      container: { backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 5 },
      languageTag: { backgroundColor: '#0366d6', padding: 5, borderRadius: 3 }
    });
    ```

4.  **Creating a Cleaner Layout**:
  - We refined the layout, ensuring that text was properly aligned, and used consistent margins and paddings to improve readability. Components like `Text` were used to display text with appropriate styles (e.g., for the repository name, description, and statistics).
        
6.  **Refactoring into Smaller Components**:
  - The `RepositoryItem` component was split into smaller components where necessary, making it more maintainable and easier to add new features in the future. For example, we could separate the avatar display, repository stats, and description into different components:
    ```js
    const Avatar = ({ uri }) => <Image source={{  uri }} style={styles.avatar} />;

    const RepositoryStats = ({ forks, stars }) => (
      <View>
        <Text>Forks: {formatCount(forks)}</Text>
        <Text>Stars: {formatCount(stars)}</Text>
      </View>
    );
    ```

By the end of this exercise, the `RepositoryItem` component was significantly improved. It now displays more visually appealing data, includes the author's avatar, and formats large numbers with precision and a "k" suffix. The overall look of the reviewed repositories list was polished, making it much more user-friendly and visually consistent.

### 10.6: the sign-in view

In this exercise, we implemented the Sign-In view, which can be accessed from the app bar via a new tab. Users will navigate to this view by pressing a new tab titled "Sign in" on the app bar. The goal is to provide a route for the sign-in functionality, even though the form itself will be implemented later.

1. **Creating the `SignIn.jsx` Component**:
  - We created a new file, `SignIn.jsx`, inside the `components` folder. Initially, the component only displays a placeholder text to indicate that this is the sign-in view:
    ```jsx
    import Text from './Text';

    const SignIn = () => {
      return <Text>The sign-in view</Text>;
    };

    export  default  SignIn;
    ```

2. **Setting Up Routing**:
  - To enable navigation to the `SignIn` component, we updated the `Main` component to include routing. We used the `Link` component from `react-router-dom` to make the "Sign in" tab clickable:
    ```jsx
    import { Link } from 'react-router-dom';
    import AppBar from './components/AppBar';
    import SignIn from './components/SignIn';

    const Main = () => {
      return(
        <View>
          <AppBar />
          <Route path="/signin" component={SignIn} />
          {/* Other routes */}
        </View>
      );
    };
    ```

3. **Adding the "Sign in" Tab**:
  - We added a new tab to the app bar to navigate to the sign-in view. The "Sign in" tab is a pressable element within the `AppBar`:
    ```jsx
    import { Pressable } from 'react-native';
    import { Link } from 'react-router-dom';

    const AppBar = () => {
      return(
        <View style={styles.container}>
          <Pressable>
            <Link to="/signin">
              <Text>Sign in</Text>
            </Link>
          </Pressable>
            {/* Other tabs */}
        </View>
      );
    };
    ```

4. **Navigation Between Views**:
  - Now, users can navigate between the "Repositories" and "Sign in" views by pressing the respective tabs. The `Link` component handles the routing seamlessly, and users will be directed to the sign-in view when the "Sign in" tab is pressed.

By the end of this exercise, we successfully added the ability to navigate between the "Repositories" and "Sign in" views by using the app bar's new tab, "Sign in." The view itself is in place, but the form functionality will be implemented in a later exercise.

### 10.7: scrollable app bar

As the app grows and more tabs are added to the app bar, it's essential to make the tabs horizontally scrollable when they don't fit within the available screen width. In this exercise, we used the `ScrollView` component to achieve horizontal scrolling for the app bar.

1. **Wrapping Tabs in `ScrollView`**:
  - We wrapped the tabs in the `AppBar` component inside a `ScrollView` to enable horizontal scrolling. By setting the `horizontal` prop of the `ScrollView` component to `true`, we allowed the app bar's tabs to scroll horizontally when necessary:
    ```jsx
    import { ScrollView, View, StyleSheet } from 'react-native';

    const AppBar = () => {
      return(
        <View style={styles.container}>
          <ScrollView horizontal={true} contentContainerStyle={styles.scrollView}>
            {/* Tabs will go here */}
          </ScrollView>
        </View>
      );
    };
    ```

2. **Styling the `ScrollView`**:
  - We added appropriate styles to the `ScrollView` to ensure the tabs are laid out in a row and can scroll horizontally. The `flexDirection: 'row'` style ensures that the tabs are placed in a horizontal row inside the `ScrollView` container:
    ```js
    const styles = StyleSheet.create({
      container: { paddingTop: 20 }, // Add padding for the status bar height 
      scrollView: { flexDirection: 'row' }, // Layout the tabs in a row 
    });
    ```

3. **Testing Horizontal Scrolling**:
  - To verify the functionality, we added multiple tabs to the app bar to make sure the scroll works when the tabs exceed the screen width. Once horizontal scrolling was confirmed, we removed the extra tabs to clean up the implementation.

4. **Smooth Horizontal Scrolling**:
  - The `ScrollView` component now provides a smooth horizontal scrolling experience. Users can swipe left or right to access tabs that would otherwise be off-screen.

By the end of this exercise, we successfully implemented a horizontally scrollable app bar, which allows users to navigate between multiple tabs without worrying about limited screen space. This improves the app's usability as it scales with more features and tabs.

### 10.8: The Sign-In Form

In this exercise, we implemented the sign-in form for the `SignIn` component. The form consists of two text fields (one for the username and one for the password) and a submit button. When the form is submitted, the values entered by the user are logged to the console. This form functionality is built using the Formik library, which simplifies handling form state and submission in React Native.

1. **Installing Formik**:
  - The first step in implementing the sign-in form was to install the Formik library, which provides utilities for managing form state and handling validation and submission. We installed Formik using npm:
    ```bash
    npm install formik
    ```

2. **Creating the `SignIn.jsx` Component**:
  - We modified the existing `SignIn.jsx` file to include the sign-in form. The form consists of two `TextInput` components: one for the username and one for the password. A `Button` component is added to submit the form:
    ```jsx
    import React from 'react';
    import { TextInput, Button, View, StyleSheet } from 'react-native';
    import { Formik } from  'formik';

    const SignIn = () => {
      return(
        <View style={styles.container}>
          <Formik initialValues={{ username: "", password: "" }} onSubmit={(values) => { console.log(values); }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values
            }) => (
              <>
                <TextInput style={styles.input} placeholder="Username" onChangeText={handleChange('username')} onBlur={handleBlur('username')} value={values.username} />
                <TextInput style={styles.input} placeholder="Password" secureTextEntry  onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                <Button onPress={handleSubmit} title="Sign In" />
              </>
            )}
          </Formik>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: { padding: 16 },
      input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
    });

    export  default  SignIn;
    ```

3. **Using Formik to Handle Form State**:
  - We used the `Formik` component to manage the form state and handle submission. The `Formik` component receives an `initialValues` prop, which sets the initial values for the form fields (both set to empty strings in this case). The `onSubmit` function logs the form values to the console:
    ```js
    onSubmit={(values) => { console.log(values); }}
    ```

4. **Text Input for Username and Password**:
  - Two `TextInput` components are used to gather the username and password from the user. For the password field, we utilized the `secureTextEntry` prop to obscure the password as the user types:
    ```js
    <TextInput style={styles.input}
      placeholder="Password" secureTextEntry
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      value={values.password}
    />
    ```

5. **Submit Button**:
  - A `Button` component is provided to submit the form. When the button is pressed, the `handleSubmit` function from Formik is triggered, which logs the form values:
    ```js
    <Button onPress={handleSubmit} title="Sign In" />
    ```

6.  **Styling the Form**:
  - We applied some basic styling to the form, ensuring that the inputs and button are spaced appropriately and easy to interact with. Each `TextInput` has a border, padding, and margin for better readability.

By the end of this exercise, we successfully implemented a sign-in form in the `SignIn` component. The form collects the username and password, and upon submission, the values are logged to the console. While the form does not yet perform any authentication or error handling, this implementation provides the foundation for those features in future exercises.

### 10.9: validating the sign-in form

In this exercise, we added validation to the sign-in form, ensuring that both the username and password fields are required. We also provided error feedback to the user when either of the fields is left empty. The error messages are displayed in red and the fields with errors receive a red border to visually indicate the issue.

1. **Installing Yup for Validation**:
  - To validate the form, we used **Yup**, a JavaScript schema builder for value parsing and validation. It works well with Formik and helps define the rules for form validation.
  - We installed Yup using npm:
    ```bash
    npm install yup
    ```

2. **Updating the `SignIn.jsx` Component**:
  - In the `SignIn.jsx` file, we used Yup to define a validation schema that ensures both the username and password fields are required.
  - We then passed this validation schema to Formik using the `validationSchema` prop.

    Here's how the updated `SignIn.jsx` file looks with validation:
    ```jsx
    import React from 'react';
    import { TextInput, Button, View, StyleSheet, Text } from 'react-native';
    import { Formik } from 'formik';
    import * as Yup from 'yup';

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    });

    const SignIn = () => {
      return(
        <View style={styles.container}>
          <Formik
            initialValues={{ username: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={(values) => { console.log(values); }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              touched,
              errors,
            }) => (
              <>
                {/* Username field */}
                <TextInput
                  style={[
                    styles.input,
                    touched.username && errors.username ? styles.error : null,
                  ]}
                  placeholder="Username"
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                />

                {/* Display error message for username */}
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}

                {/* Password field */}
                <TextInput
                  style={[
                    styles.input,
                    touched.password && errors.password ? styles.error : null,
                  ]}
                  placeholder="Password"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                {/* Display error message for password */}
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Submit button */}
                <Button onPress={handleSubmit} title="Sign In" />
              </>
            )}
          </Formik>
        </View>
      );
    };

    const styles = StyleSheet.create({
      container: { padding: 16 },
      input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 12, paddingLeft: 8 },
      error: { borderColor: '#d73a4a' }, // Red border color for invalid fields
      errorText: { color: '#d73a4a' } // Red text color for error messages
    });

    export default SignIn;
    ```

3. **Creating the Validation Schema**:
  - We defined a validation schema using Yup to specify the requirements for the form fields:
    - The `username` field is required and cannot be empty.
    - The `password` field is required and cannot be empty.
  - This schema is then passed to Formik as `validationSchema`:
    ```js
    validationSchema={validationSchema}
    ```

2. **Displaying Error Messages**:
  - If a user attempts to submit the form with an invalid field, Formik will automatically set the `errors` object for that field.
  - If a field is touched and has an error, we display an error message beneath it using a `Text` component, styled with the red color `#d73a4a`:
    ```js
    {touched.username && errors.username && (
      <Text style={styles.errorText}>{errors.username}</Text>
    )}
    ```

3. **Styling the Error States**:
  - We added conditional styles to the `TextInput` components to highlight fields with errors. If a field is touched and has an error, it receives a red border using the `styles.error` style:
    ```js
    style={[
      styles.input,
      touched.username && errors.username ? styles.error : null,
    ]}
    ```

4. **Visual Feedback**:
  - When a user enters invalid data (e.g., leaving the fields empty), the form fields are visually highlighted with a red border, and error messages in red appear below the invalid fields. This makes it clear which fields require attention before submission.

By the end of this exercise, we successfully implemented validation for the sign-in form, ensuring that both the username and password fields are required. We also provided users with clear visual feedback by displaying red error messages and highlighting the invalid fields with a red border. This enhances the user experience by guiding them to correct their input before submitting the form.

### 10.10: a platform-specific font

In this exercise, we updated the font configuration of the application to use platform-specific sans-serif fonts. Instead of using the default System font for all platforms, we customized the fontFamily setting in the theme.js file to use Roboto on Android, Arial on iOS, and fall back to System on other platforms (e.g., web or other devices). This change enhances the native look and feel of the app by matching platform-specific design conventions.

1. Using the Platform API from React Native:
  - To conditionally assign fonts depending on the operating system, we imported the Platform module from react-native. This built-in module allows us to detect the current platform and apply platform-specific logic.
    ```js
    import { Platform } from 'react-native';
    ```

2. Modifying the Theme Configuration:
  - In the theme.js file, we previously had a font setting like this:
    ```js
    fontFamily: 'System',
    ```

  - We replaced this with a conditional expression using Platform.OS to set different fonts:
    ```js
    fontFamily: Platform.select({
      ios: 'Arial',
      android: 'Roboto',
      default: 'System',
    }),
    ```

  - This updated configuration ensures that:
    - iOS devices use the Arial font.
    - Android devices use the Roboto font.
    - Other platforms (e.g., web) fall back to the System font.

3. Updated theme.js File:
  - The relevant part of the theme.js file now looks like this:
    ```js
    import { Platform } from 'react-native';

    const theme = {
      colors: {
        // other colors...
      },
      fontSizes: {
        body: 14,
        subheading: 16
      },
      fonts: {
        main: Platform.select({
          ios: 'Arial',
          android: 'Roboto',
          default: 'System'
        }),
      },
      fontWeights: {
        normal: '400',
        bold: '700',
      },
    };

    export default theme;
    ```

This configuration is then used throughout the app in styled components and custom Text components that apply styles from the theme.

4. Testing on Multiple Platforms:
  - After applying the changes, we ran the app on both Android and iOS simulators to verify that the correct font was being used.
  - On iOS, text appeared with the Arial font, and on Android, Roboto was applied as expected.

5. Why This Matters:
  - Using fonts that are native to each platform makes the app feel more natural to users and aligns better with platform UI guidelines.
  - For instance, Roboto is the system font for Android and is optimized for legibility and performance on Android devices. Similarly, Arial is widely used on iOS and familiar to iOS users.

By the end of this task, the application's text appearance was improved by applying platform-specific sans-serif fonts. This small but important change ensures a more native and polished look across Android and iOS devices. It also reinforces good cross-platform development practices by considering the visual consistency users expect on their respective platforms.

### 10.11: fetching repositories with Apollo Client

In this exercise, we migrated the data-fetching logic in the `useRepositories` custom hook from the traditional **Fetch API** to using **Apollo Client** and **GraphQL**. This not only integrates the app with a modern GraphQL-based backend but also takes advantage of Apollo Client’s built-in caching, error handling, and pagination support (which we’ll use later).

1. Exploring the API with Apollo Sandbox:
  - Opened Apollo Sandbox at `http://localhost:4000`.
  - Explored the documentation in the sidebar to find the `repositories` query.
  - Learned that `repositories` returns paginated data and accepts optional arguments (which we ignored for now).
  - Composed and tested the query in the Sandbox to fetch only the fields needed for the UI:
    ```graphql
    query {
      repositories {
        edges {
          node {
            id
            fullName
            description
            language
            forksCount
            stargazersCount
            ratingAverage
            reviewCount
            ownerAvatarUrl
          }
        }
      }
    }
    ```

2. Writing the GraphQL Query in Code:
  - Created a `GET_REPOSITORIES` query in a new or existing `graphql/queries.js` file using the `gql` tag:
    ```js
    import { gql } from '@apollo/client';

    export const GET_REPOSITORIES = gql`
      query {
        repositories {
          edges {
            node {
              id
              fullName
              description
              language
              forksCount
              stargazersCount
              ratingAverage
              reviewCount
              ownerAvatarUrl
            }
          }
        }
      }
    `;
    ```

3. Refactoring `useRepositories` Hook:
  - Opened the `useRepositories.js` file (usually located in a `hooks/` directory).
  - Replaced the Fetch API logic with Apollo Client’s `useQuery` hook:
    ```js
    import { useQuery } from '@apollo/client';
    import { GET_REPOSITORIES } from '../graphql/queries';

    const useRepositories = () => {
      const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
      });

      const repositories = data?.repositories;

      return { repositories, loading, error };
    };

    export default useRepositories;
    ```
  - `fetchPolicy: 'cache-and-network'` ensures the UI displays cached data immediately while also refetching in the background to update the view.

4. Verifying the Result:
  - Confirmed that the UI displayed the same repository list as before.
  - No changes were needed in `RepositoryList` or any consuming components, thanks to good hook encapsulation.
  - Ensured no errors were thrown and that loading states behaved correctly.

### 10.12: environment variables

In this exercise, we refactored the Apollo Client initialization to use an environment variable instead of a hardcoded server URL. This makes our configuration more secure, flexible, and better suited for different environments (e.g., development, staging, production).

1. Created the `.env` File:
  - At the root of the project, created a `.env` file containing the Apollo Server URI:
    ```env
    APOLLO_URI=http://localhost:4000/graphql
    ```

2. Updated `app.config.js`:
  - The `dotenv` library can only be used inside `app.config.js`. Loaded environment variables using `dotenv` and added them to the `extra` section of the Expo config:
    ```js
    import 'dotenv/config';

    export default {
      expo: {
        name: 'rate-repository-app',
        slug: 'rate-repository-app',
        version: '1.0.0',
        extra: {
          apolloUri: process.env.APOLLO_URI,
        },
        // Other config values...
      },
    };
    ```

3. Accessed Environment Variables with `Constants`:
  - In the Apollo Client setup file (e.g., `src/apolloClient.js`), imported `Constants` from Expo and used the URI from the `extra` object:
    ```js
    import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
    import Constants from 'expo-constants';

    const httpLink = createHttpLink({
      uri: Constants.expoConfig.extra.apolloUri,
    });

    const apolloClient = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    export default apolloClient;
    ```

### 10.13: the sign in form mutation

1. Explored the Authentication API:
  - Opened the Apollo Sandbox at http://localhost:4000 and explored the authenticate mutation.
  - Verified that it accepts a credentials input of type AuthenticateInput, which includes username and password.
  - If necessary, seeded the database using instructions in the API's README.

2. Created the useSignIn Hook:
  - Inside src/hooks/useSignIn.js, implemented a custom hook to perform the authenticate mutation:
    ```js
    import { useMutation } from '@apollo/client';
    import { AUTHENTICATE } from '../graphql/mutations';

    const useSignIn = () => {
      const [mutate, result] = useMutation(AUTHENTICATE);

      const signIn = async ({ username, password }) => {
        return await mutate({
          variables: {
            credentials: { username, password },
          },
        });
      };

      return [signIn, result];
    };

    export default useSignIn;
    ```

  - The AUTHENTICATE mutation is defined in src/graphql/mutations.js:
    ```js
    import { gql } from '@apollo/client';

    export const AUTHENTICATE = gql`
      mutation Authenticate($credentials: AuthenticateInput!) {
        authenticate(credentials: $credentials) {
          token
        }
      }
    `;
    ```

3. Used the Hook in SignIn.jsx:
  - Replaced the console-logging onSubmit function with one that uses the signIn function:
    ```jsx
    import useSignIn from '../hooks/useSignIn';

    const SignIn = () => {
      const [signIn] = useSignIn();

      const onSubmit = async (values) => {
        const { username, password } = values;

        try {
          const { data } = await signIn({ username, password });
          console.log(data); // Should contain { authenticate: { token: "..." } }
        } catch (e) {
          console.log(e);
        };
      };

      // ... form rendering logic
    };
    ```
    
✅ At this point, submitting the form successfully logs the user’s access token.

### 10.14: storing the access token, step 1

1. Created `authStorage.js` in the `utils` Directory:
  - Set up a class `AuthStorage` to handle secure token management using `AsyncStorage`:
    ```js
    import AsyncStorage from '@react-native-async-storage/async-storage';

    class AuthStorage {
      constructor(namespace = 'auth') {
        this.namespace = namespace;
      };

      async getAccessToken() {
        const token = await AsyncStorage.getItem(`${this.namespace}:token`);
        return token;
      };

      async setAccessToken(token) {
        await AsyncStorage.setItem(`${this.namespace}:token`, token);
      };

      async removeAccessToken() {
        await AsyncStorage.removeItem(`${this.namespace}:token`);
      };
    };

    export default AuthStorage;
    ```

2. Behavior and Usage:
  - This utility allows consistent access to authentication tokens under the key `"auth:token"` (or another namespace if customized).
  - It will later be injected into the application context to allow reading/writing tokens in different parts of the app (e.g., authorization header injection, sign-out logic, etc.).

### 10.15: storing the access token, step 2

1. Extended the `useSignIn` Hook:
  - Imported `useApolloClient` from Apollo and used our `AuthStorage` utility:
    ```js
    import { useApolloClient, useMutation } from '@apollo/client';
    import { AUTHENTICATE } from '../graphql/mutations';
    import AuthStorage from '../utils/authStorage';

    const useSignIn = () => {
      const [mutate, result] = useMutation(AUTHENTICATE);
      const apolloClient = useApolloClient();
      const authStorage = new AuthStorage();

      const signIn = async ({ username, password }) => {
        const { data } = await mutate({
          variables: {
            credentials: { username, password },
          },
        });

        if (data?.authenticate?.accessToken) {
          await authStorage.setAccessToken(data.authenticate.accessToken);
          await apolloClient.resetStore(); // Clear cache & re-fetch queries
        };

        return { data };
      };

      return [signIn, result];
    };
    ```

2. Updated SignIn Component for Redirection:
  - Used `useNavigate` from React Router to redirect after a successful sign-in:
    ```jsx
    import { useNavigate } from 'react-router-native';
    import useSignIn from '../hooks/useSignIn';

    const SignIn = () => {
      const [signIn] = useSignIn();
      const navigate = useNavigate();

      const onSubmit = async (values) => {
        const { username, password } = values;

        try {
          const { data } = await signIn({ username, password });
          
          if (data?.authenticate?.accessToken) {
            navigate('/'); // Redirect to reviewed repositories
          }
        } catch (e) {
          console.log(e);
        };
      };

      // ... form rendering logic
    };
    ```

✅ After these changes, submitting the form stores the token, resets the Apollo cache, and redirects to the repository list.

### 10.16: sign out

1. Verified the `me` Query in Apollo Sandbox:
  - Ran this query without a token:
    ```graphql
    {
      me {
        id
        username
      }
    }
    ```
  - Received `null` as expected.
  - Used `authenticate` to get an access token and tested the query again with the `Authorization: Bearer <token>` header.

2. Queried the Current User in App:
  - In `AppBar.jsx`, used the `useQuery` hook with the `ME` query to detect if a user is signed in.
    ```js
    import { useQuery } from '@apollo/client';
    import { ME } from '../graphql/queries';

    const { data } = useQuery(ME);
    const authorizedUser = data?.me;
    ```

3. Conditional AppBar Tabs:
  - Replaced the static "Sign in" tab with conditional rendering:
    ```js
    {authorizedUser ? (
      <AppBarTab onPress={handleSignOut}>Sign out</AppBarTab>
    ) : (
      <AppBarTab link="/signin">Sign in</AppBarTab>
    )};
    ```

4. Implemented the `handleSignOut` Function:
  - Removed the access token using `AuthStorage` and reset Apollo Client:
    ```js
    import { useApolloClient } from '@apollo/client';
    import AuthStorage from '../utils/authStorage';

    const authStorage = new AuthStorage();
    const apolloClient = useApolloClient();

    const handleSignOut = async () => {
      await authStorage.removeAccessToken();
      await apolloClient.resetStore(); // Important: reset after token removal
    };
    ```

✅ After pressing "Sign out", the token is removed, Apollo’s cache is cleared, and the UI updates based on the new auth state.

### 10.17: testing the reviewed repositories list

In this exercise, we implemented a unit test that verifies whether the `RepositoryListContainer` component correctly renders repository data such as name, description, language, forks count, stars, rating, and reviews.

1. Added `testID` to Repository Items:
  - To easily access each rendered repository item during testing, we added a `testID` prop:
    ```jsx
    const RepositoryItem = ({ repository }) => (
      <View testID="repositoryItem">
        {/* Display repository info */}
      </View>
    );
    ```

2. Created a Test File and Base Test:
  - We used the provided `repositories` mock data in our test and followed the recommended test structure:
    ```js
    import React from 'react';
    import { render, screen } from '@testing-library/react-native';
    import RepositoryListContainer from '../../components/RepositoryListContainer';

    describe('RepositoryList', () => {
      describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
          const repositories = { /* provided mock data */ };

          render(<RepositoryListContainer repositories={repositories} />);

          const repositoryItems = screen.getAllByTestId('repositoryItem');
          expect(repositoryItems).toHaveLength(2);

          const [first, second] = repositoryItems;

          // Repository 1
          expect(first).toHaveTextContent('jaredpalmer/formik');
          expect(first).toHaveTextContent('Build forms in React, without the tears');
          expect(first).toHaveTextContent('TypeScript');
          expect(first).toHaveTextContent('1.6k'); // Forks
          expect(first).toHaveTextContent('21.9k'); // Stars
          expect(first).toHaveTextContent('88');
          expect(first).toHaveTextContent('3');

          // Repository 2
          expect(second).toHaveTextContent('async-library/react-async');
          expect(second).toHaveTextContent('Flexible promise-based React data loader');
          expect(second).toHaveTextContent('JavaScript');
          expect(second).toHaveTextContent('69');
          expect(second).toHaveTextContent('1.8k');
          expect(second).toHaveTextContent('72');
          expect(second).toHaveTextContent('3');
        });
      });
    });
    ```

3. Verified Output with `debug()`:
  - If any confusion arose about rendered output, we used `screen.debug()` to inspect the current DOM tree.

✅ After this test, we can confidently say that repository information is being rendered correctly for each item.

### 10.18: testing the sign in form

This test ensures that submitting a valid sign in form calls the `onSubmit` function with the correct credentials.

1. Extracted a Pure SignInContainer Component:
  - To isolate the logic from Apollo or navigation, we created a SignInContainer that accepts an onSubmit prop:
    ```js
    const SignInContainer = ({ onSubmit }) => {
      return (
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, handleChange, values }) => (
            <View>
              <TextInput
                placeholder="Username"
                onChangeText={handleChange('username')}
                value={values.username}
              />

              <TextInput
                placeholder="Password"
                onChangeText={handleChange('password')}
                value={values.password}
                secureTextEntry
              />

              <Pressable onPress={handleSubmit}>
                <Text>Sign in</Text>
              </Pressable>
            </View>
          )}
        </Formik>
      );
    };
    ```

2. Wrote the Test Case:
  ```js
  import React from 'react';
  import { render, fireEvent, waitFor } from '@testing-library/react-native';
  import SignInContainer from '../../components/SignInContainer';

  describe('SignIn', () => {
    describe('SignInContainer', () => {
      it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
        const mockSubmit = jest.fn();

        const { getByPlaceholderText, getByText } = render(
          <SignInContainer onSubmit={mockSubmit} />
        );

        fireEvent.changeText(getByPlaceholderText('Username'), 'user123');
        fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
        fireEvent.press(getByText('Sign in'));

        await waitFor(() => {
          expect(mockSubmit).toHaveBeenCalledTimes(1);
          expect(mockSubmit).toHaveBeenCalledWith({
            username: 'user123',
            password: 'password123',
          });
        });
      });
    });
  });
  ```

✅ This test confirms that the form works and that onSubmit is called only after the form is successfully filled and submitted.

### 10.19: the single repository view

Create a separate view for a single repository. It should show the same info as in RepositoryItem, with an additional button to open the GitHub URL.
  - `useParams` from `react-router-native`
  - `Linking.openURL()` from Expo
  - GraphQL `repository(id: ID!)` query

1. Add navigation and query in `SingleRepository.jsx`:
  ```jsx
  import { useParams } from 'react-router-native';
  import { useQuery } from '@apollo/client';
  import { Linking, Button, View } from 'react-native';
  import RepositoryItem from './RepositoryItem';
  import { GET_REPOSITORY } from '../graphql/queries';

  const SingleRepository = () => {
    const { id } = useParams();
    const { data, loading } = useQuery(GET_REPOSITORY, {
      variables: { id },
      fetchPolicy: 'cache-and-network',
    });

    if (loading) return <Text>Loading...</Text>;

    return (
      <View>
        <RepositoryItem item={data.repository} singleView />
        <Button title="Open in GitHub" onPress={() => Linking.openURL(data.repository.url)} />
      </View>
    );
  };
  ```

2. Update `RepositoryItem` to support prop `singleView`:
  ```jsx
  const RepositoryItem = ({ item, singleView = false }) => (
    <View>
      {/* existing info */}
      
      {singleView && (
        <Button title="Open in GitHub" onPress={() => Linking.openURL(item.url)} />
      )}
    </View>
  );
  ```

3. Wrap repositories in Pressable in `RepositoryList.jsx`:
  ```jsx
  import { useNavigate } from 'react-router-native';

  const RepositoryList = () => {
    const navigate = useNavigate();

    return (
      <FlatList
        data={repositories}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  };
  ```

### 10.20: repository's review list

Display a list of reviews for a selected repository.
  - Extend the repository query to include the `reviews` field.
  - Display reviews using a `FlatList`.
  - Use `ListHeaderComponent` to show repository details.
  - Each review item should include:
    - Text
    - Rating (0–100)
    - Date (formatted with `date-fns` to `dd.MM.yyyy`)
    - Reviewer’s username
  - Make the rating visually circular using `borderRadius` and fixed width/height.

1. Update `ReviewItem.jsx`:
  ```jsx
  const ReviewItem = ({ review }) => (
    <View>
      <Text>{review.user.username}</Text>
      <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
      <Text>{review.text}</Text>
      <Text>{review.rating}</Text>
    </View>
  );
  ```

2. Update `SingleRepository.jsx`:
  ```jsx
  <FlatList
    data={data.repository.reviews.edges.map(edge => edge.node)}
    renderItem={({ item }) => <ReviewItem review={item} />}
    keyExtractor={({ id }) => id}
    ListHeaderComponent={() => <RepositoryItem item={data.repository} singleView />}
    ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
  />
  ```

### 10.21: the review form

Create a form for submitting a review.
  - **Form Fields**:
    - Repository owner's username (required string)
    - Repository name (required string)
    - Rating (required number between 0–100)
    - Review text (optional string)
  - **Validation**:
    - Use Yup schema for validation.
    - Provide error messages for invalid inputs.
  - **Logic**:
    - Submit the form using the `createReview` mutation.
    - On success, redirect to the single repository view using `navigate()`.
    - Use `fetchPolicy: 'cache-and-network'` in the single repository query to prevent stale data.
    - Add a “Create a review” tab to the app bar (only visible for signed-in users).

1. Formik + Yup form:
  ```jsx
  <Formik
    initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
    onSubmit={onSubmit}
    validationSchema={Yup.object({
      ownerName: Yup.string().required('Repository owner is required'),
      repositoryName: Yup.string().required('Repository name is required'),
      rating: Yup.number().min(0).max(100).required('Rating is required'),
      text: Yup.string()
    })}
  >
    {({ handleChange, handleSubmit, values }) => (
      <>
        <TextInput onChangeText={handleChange('ownerName')} value={values.ownerName} />
        <TextInput onChangeText={handleChange('repositoryName')} value={values.repositoryName} />
        <TextInput keyboardType="numeric" onChangeText={handleChange('rating')} value={values.rating} />
        <TextInput multiline onChangeText={handleChange('text')} value={values.text} />
        <Button onPress={handleSubmit} title="Create review" />
      </>
    )}
  </Formik>
  ```

2. Mutation + Redirect:
  ```jsx
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { data } = await createReview({ variables: { review: values } });
    navigate(`/${data.createReview.repositoryId}`);
  };
  ```

### 10.22: the sign up form

Implement a sign-up form to register new users.
  - Form Fields:
    - Username (required, 5–30 characters)
    - Password (required, 5–50 characters)
    - Password confirmation (must match password)
  - Logic:
    - Use Formik for handling form state.
    - Use Yup for validation with `oneOf` and `ref` for password match.
    - Register users using `createUser` mutation.
    - Automatically sign the user in upon successful registration.
    - Redirect the user to the repository list view after login.
    - Add a “Sign up” tab to the app bar (only visible to non-authenticated users).

1. Validation schema:
  ```js
  Yup.object({
    username: Yup.string().min(5).max(30).required(),
    password: Yup.string().min(5).max(50).required(),
    passwordConfirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
  });
  ```

2. After successful creation:
  ```js
  await createUser({ variables: { user: { username, password } } });
  await signIn({ username, password });
  navigate('/');
  ```

### 10.23: sorting the reviewed repositories list

Allow users to change the sorting order of the repository list.
  - Options:
    - Latest repositories (default)
    - Highest rated
    - Lowest rated
  - Implementation:
    - Use `orderBy` (CREATED_AT / RATING_AVERAGE) and `orderDirection` (ASC / DESC) in query.
    - Manage selected option using `useState`.
    - Provide a selection UI using `@react-native-picker/picker` or similar.
    - Place sorting control in the list header via `ListHeaderComponent`.

1. Add Picker:
  ```js
  <Picker
    selectedValue={order}
    onValueChange={(value) => setOrder(value)}
  >
    <Picker.Item label="Latest" value="latest" />
    <Picker.Item label="Highest rated" value="highest" />
    <Picker.Item label="Lowest rated" value="lowest" />
  </Picker>
  ```

2. Transform order into query params:
  ```js
  let variables = {};

  if (order === 'latest') {
    variables = { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  } else if (order === 'highest') {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
  } else {
    variables = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
  };
  ```

### 10.24: filtering the reviewed repositories list

Implement keyword-based filtering of repositories.
  - Logic:
    - Use the `searchKeyword` argument in the repositories query.
    - Capture user input with `TextInput` or `Searchbar`.
    - Debounce user input using the `use-debounce` library (e.g., 500ms).
    - Pass the debounced keyword to the query.
    - Fix input blur issue by making the list a class component and defining the header render function as a class property.

1. Search bar:
  ```jsx
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  <TextInput value={search} onChangeText={setSearch} placeholder="Search..." />
  ```

2. Pass debouncedSearch into GraphQL hook:
  ```js
  useRepositories({ searchKeyword: debouncedSearch });
  ```

### 10.25: the user's reviews view

Allow signed-in users to view their own reviews.
  - Logic:
    - Use the `me` query with a conditional `@include(if: $includeReviews)` directive.
    - Fetch user reviews only when needed using `includeReviews: true`.
    - Create a “My reviews” tab in the app bar for navigation.
    - Display the reviews similar to how repository reviews are displayed.

1. Update GraphQL
  ```graphql
  query GetCurrentUser($includeReviews: Boolean = false) {
    me {
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
            }
          }
        }
      }
    }
  }
  ```

2. In component:
  ```jsx
  const { data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });
  ```

### 10.26: review actions

Enable actions for reviews: viewing the associated repository and deleting a review.
  - Implementation:
    - Add two buttons below each review:
    - View Repository → navigates to the single repository view.
    - Delete Review → triggers a confirmation dialog using `Alert.alert`.
    - Use the `deleteReview` mutation to remove a review after user confirmation.
    - Use the `refetch` function to update the view after deletion.
    - Test deletion using the Expo mobile app or an emulator, as alerts don't display in the web preview.

1. Delete logic:
  ```jsx
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview({ variables: { id: review.id } });
            refetch(); // Refresh the list
          },
        },
      ]
    );
  };
  ```

2. Buttons:
  ```jsx
  <Button title="View repository" onPress={() => navigate(`/${review.repository.id}`)} />
  <Button title="Delete review" onPress={handleDelete} />
  ```

### 10.27: infinite scrolling for the repository's reviews list

Implement infinite scrolling in the single repository view to load reviews as the user scrolls down. This should use the `first` and `after` arguments in the GraphQL query and the `pageInfo` object to detect if more reviews are available.

1. To make infinite scrolling work correctly, configure `relayStylePagination` for the `reviews` field inside `Repository`.
  ```js
  import { InMemoryCache } from '@apollo/client';
  import { relayStylePagination } from '@apollo/client/utilities';

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(),
        },
      },
    },
  });
  ```

2. Update `useRepository` Hook:
  ```js
  const useRepository = (id, first = 4) => {
    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
      variables: { id, first },
      fetchPolicy: 'cache-and-network',
    });

    const handleFetchMore = () => {
      const canFetchMore =
        !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

      if (!canFetchMore) return;

      fetchMore({
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          first,
        },
      });
    };

    return {
      repository: data?.repository,
      loading,
      fetchMore: handleFetchMore,
      ...result,
    };
  };
  ```

3. Update `SingleRepository.jsx`:
  ```jsx
  import { FlatList } from 'react-native';
  import ReviewItem from './ReviewItem';
  import useRepository from '../hooks/useRepository';

  const SingleRepository = () => {
    const { id } = useParams();
    const { repository, fetchMore, loading } = useRepository(id, 4); // Start with small batch

    if (loading || !repository) return <Text>Loading...</Text>;

    const reviews = repository.reviews.edges.map(edge => edge.node);

    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => (
          <RepositoryItem item={repository} singleView />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
      />
    );
  };
  ```

## 💻 Installation and Running

Follow these steps to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/niezle-ziolko/full-stack-open-rate-repository-app
```

2. Install the dependencies:

```bash
npm install
```

3. Start test:

```bash
npm run test
```

4. Start the development server:

```bash
npm run server
```

5. Development mode (depending on the system):

```bash
npm run android
```

or 

```bash
npm run ios
```

or

```bash
npm run web
```

The application will be available at [http://localhost:8081](http://localhost:8081) and server is available at [http://localhost:4000](http://localhost:4000).

## 🧠 Notes

📋 Repository List
  - Lists repositories with sorting options (latest, highest rated, lowest rated).
  - Displays key repository info: name, description, stars, forks, rating, reviews count.
  - Implements infinite scrolling using FlatList and Apollo fetchMore.

🔍 Single Repository View
  - Detailed repository view including a clickable GitHub link.
  - Displays a list of user reviews for that repository.
  - Implements infinite scrolling for reviews using Apollo pagination.

🧑 Authentication
  - Login and signup functionality.
  - Form validation with Formik and Yup.
  - Uses SecureStore to persist auth tokens.

✍️ Review Creation
  - Authenticated users can leave reviews (rating 0–100 + optional comment).
  - New reviews immediately show up in the repository's detail view.

🙍 User Reviews View
  - Authenticated users can see all their own reviews.
  - Includes delete functionality with confirmation prompts.
