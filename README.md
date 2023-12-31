# Pickt
Pickt is a web forum application for photographers and photography enthusiasts.
It allows you to posts questions, foster discussion and share your artworks to 
a community of passionate photographers. 

## Features 
- **Engage with the community**
    - Post and share tips, discussions and questions!
    - Vote and comment on ideas you find useful
- **Personalize your profile**
    - Create your profile
    - Add a bio that introduces your personality
    - Share your portfolio of works
- **Improve your craft**
    - Search for exactly what you need
    - Get featured on the front page with Daily Highlight
    

# Running the App Locally
## Dependencies
- Node v18.16.0 or above
- npm v9.8.1 or above

## Installation
1. Clone this repository.
2. Install the necessary dependencies. 
    ```
    npm install
    ```
3. If you want to generate background images, you need to use the Unsplash API.
    1. Create a developer account in [Unsplash](https://unsplash.com/oauth/applications).
    2. Create an application and complete the details.
    4. Create a `.env` file in the `pickt-client/` directory.
    3. Copy the access key and the secret key, and paste them as values for 
    `REACT_APP_ACCESS_KEY` and `REACT_APP_SECRET_KEY` respectively.
4. Set up the database.
    1. Using MongoDBCompass, create a connection in `localhost:27017`.
    2. Create a database using the name `pickt-db` or choose a name.
    3. The server will initialize the sample data.
5. Setup your environment variables in the `pickt-server` dircetory.
    ```
    SERVER_PORT=3001
    MONGO_URI=mongodb://127.0.0.1:27017/
    DB_NAME=<pickt-db | or your own name>
    SECRET_KEY=<a long key string for authentication>
    ```
4. Run `npm start` in the root directory.
5. Go to `localhost:3000/` in your browser.

# Project Overview and Scope
## Phase I: Client-Side Application
### Scope

This phase generally deals with most features of the front-end application. This 
includes:
- Mechanisms for viewing users, posts and comments
- Upvoting and downvoting posts and comments
- Creating posts
- Registering and logging in
- A basic schema of data which the front-end expects from the back-end server
(as to make the transition to Phase II easier)

I also implement loose form validation.

### Limitations

Some features may not be completely finished. This includes persistence 
(or loose persistence) of data since some feature "remember" past actions 
(such as logging in) but other features do not (such as voting).

Some features have visible components but do not have behavior. This includes:
- Search bar
- Replying in comments
- Editing and deleting posts
- About Page (which will be finalized in Phase III)

Some bonus features are also not completely implemented:
- Daily Highlight (which will occupy the left part of the Home page)
- Portfolio for each users
- Filtering based on post tags

### Future Development

Furthermore, current code will be refactored before working on Phase II 
to mitigate technical debt.

I also identify some design considerations that I may work on before Phase II:
- Using human-readable slugs for the URL of the posts
- More visually appealing ways to inform user of errors in answering forms 
(i.e. modals and dialogs)
- Adding error pages for invalid users or posts
- ~~Making the search bar collapsible as a magnifying glass icon when not 
in focused to minimize clutter~~ 
- Adding functionality that allows for infinite scroll
- Consider adding safe markup functionality by importing third-party libraries 
such as `Quill.js`

### Directory
The client application has the following directory:
- `public/` - contains assets such as .jpg or .svg files that are visible 
to the public
- `src/components/shared` - contains components that are shared throughout 
the web application (i.e. avatar, button, form elements, layout, vote buttons)
- `src/components/Forms` - contains forms that are used throughout the application 
such as for creating posts, logging in and signing up.
- `src/components/Post` - contains components that render information 
about posts.
- `src/components/Comments` - contains components that render information 
about comments
- `src/data` - contains dummy data for demonstration
- `src/hooks` - contains shared custom hooks
- `src/pages` - contains the collection of components that comprise a page 
(e.g home, user, ...)
- `src/services` - contains API calls to the back-end server; for Phase I, 
these functions are mocked by referring to the dummy data
- `src/types` - contains predefined types that reflect the schema expected 
from the database
- `src/utils` - contains modules, not necessarily related to the domain logic, 
that are used throughout the codebase

# Technologies Used
## Phase I: Client-Side App
- React and React Router for the main app framework with routing
- FontAwesome for icons and Babel for rendering the icons
- Google Fonts for fonts
- TypeScript for ease of development
- Unsplash API and `unsplash-js` for generating random background images
- Dummy data is co-generated by ChatGPT
