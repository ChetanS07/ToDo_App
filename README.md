# ToDo_App

This is a simple Todo app created using Express.js, Node.js, MongoDB, and EJS templates. The app allows users to create new lists, add items to those lists, delete items from lists, and delete lists themselves. It also implements Google Sign-In for user authentication and utilizes session management for a seamless user experience.

## Features

- User authentication using Google Sign-In.
- Create new lists to organize tasks.
- Delete items from lists.
- Delete entire lists.

## Installation

To run this application on your local machine, make sure you have the following dependencies installed:

- Node.js (v12 or higher)
- MongoDB

Follow these steps to set up the project:

1. Clone this repository:

   ```
   git clone https://github.com/ChetanS07/ToDo_App.git
   ```

2. Navigate to the project directory:

   ```
   cd ToDo_App
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Set up the environment variables:

   - Rename the `.env.example` file to `.env`.
   - Fill in the necessary values for the environment variables in the `.env` file. (For example, `MONGODB_URI` for the MongoDB connection string and `SESSION_SECRET` for session management.)

5. Start the application:

   ```
   npm start
   ```

6. Open your browser and visit `http://localhost:8000` to access the Todo app.

## Usage

1. On the landing page, you will be presented with the option to sign in with your Google account.

2. After signing in, you will be redirected to the main dashboard where you can create new lists.

3. To create a new list, click on the "New List" button and enter a name for the list.

4. Once a list is created, you can add items to it by clicking on the list name. Provide the necessary details such as item name and priority, and click "Add Item".

5. To delete an item, click on the "Delete" button next to it.

6. To delete an entire list, click on the "Delete List" button at the top-right corner of the list.

7. You can sign out of the application by clicking on your profile picture at the top-right corner and selecting "Sign Out".


## The Website is hosted live at : https://todo-app-zwow.onrender.com/login


Thank you for using the Todo App! We hope it helps you stay organized and productive.
