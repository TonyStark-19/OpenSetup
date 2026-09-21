## Prerequisites

Before starting, make sure **Node.js** and **npm** are installed on your machine.

Run the following commands in your terminal:

```bash
node -v
npm -v
```

Example output:

```bash
v22.16.0
10.9.2
```

If both commands return version numbers, you're ready to continue.

---

## Step 1: Create a New Node.js Project

Create a new directory for your server:

```bash
mkdir my-server
```

Navigate into the project:

```bash
cd my-server
```

Initialize a Node.js project:

```bash
npm init -y
```

This creates a `package.json` file that contains your project's configuration and dependencies.

---

## Step 2: Install Express.js

Install Express using npm:

```bash
npm install express
```

Express is a lightweight Node.js framework used for building web servers and APIs.

---

## Step 3: Create the Server File

Create a file named `server.js` in the project root:

```text
my-server/
├── node_modules/
├── package-lock.json
├── package.json
└── server.js
```

---

## Step 4: Set Up the Express Server

Open `server.js` and import Express:

```js
const express = require("express");
```

Create an Express application:

```js
const app = express();
```

Define the port:

```js
const PORT = 5000;
```

Create a basic route:

```js
app.get("/", (req, res) => {
  res.send("Server is running!");
});
```

Finally, start the server:

```js
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Your complete `server.js` file should look like:

```js
const express = require("express");

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Step 5: Start the Server

Run the following command:

```bash
node server.js
```

You should see:

```text
Server running on http://localhost:5000
```

Open the following URL in your browser:

```text
http://localhost:5000
```

You should see:

```text
Server is running!
```

Your Node.js + Express server is now working.

---

## Step 6: Add JSON Middleware

When building APIs, you'll commonly receive JSON data from clients.

Add the following middleware before your routes:

```js
app.use(express.json());
```

Your server now becomes:

```js
const express = require("express");

const app = express();

const PORT = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

`express.json()` allows Express to parse incoming JSON request bodies.

---

## Step 7: Create a Basic API Route

You can create different routes for your API.

For example:

```js
app.get("/api/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    users: [],
  });
});
```

Now you can visit:

```text
http://localhost:5000/api/users
```

The server will return:

```json
{
  "message": "Users fetched successfully",
  "users": []
}
```

---

## Step 8: Create a POST Route

You can also receive data from the client using a `POST` request.

```js
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  res.status(201).json({
    message: "User created successfully",
    user: {
      name,
      email,
    },
  });
});
```

Because we added:

```js
app.use(express.json());
```

Express can access the request body through:

```js
req.body
```

For example, sending:

```json
{
  "name": "Aditya",
  "email": "aditya@example.com"
}
```

will return:

```json
{
  "message": "User created successfully",
  "user": {
    "name": "Aditya",
    "email": "aditya@example.com"
  }
}
```

---

## Step 9: Add a Development Script

Instead of manually running:

```bash
node server.js
```

you can add a script to `package.json`:

```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

Now you can start the server using:

```bash
npm start
```

---

## Step 10: Use Nodemon for Development

During development, restarting the server manually every time you make a change can be inconvenient.

Install Nodemon as a development dependency:

```bash
npm install --save-dev nodemon
```

Update your `package.json` scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

Now run:

```bash
npm run dev
```

Nodemon will automatically restart the server whenever you make changes to your code.

---

## Final Server Code

Your basic Express server can now look like:

```js
const express = require("express");

const app = express();

const PORT = 5000;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// GET API route
app.get("/api/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    users: [],
  });
});

// POST API route
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  res.status(201).json({
    message: "User created successfully",
    user: {
      name,
      email,
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Final Project Structure

After completing the setup, your project will look similar to:

```text
my-server/
├── node_modules/
├── package-lock.json
├── package.json
├── server.js
└── .gitignore
```

---

## Basic Express Server Flow

The basic architecture is:

```text
Node.js
   │
   ▼
Express.js
   │
   ▼
Create App
   │
   ▼
Add Middleware
   │
   ▼
Create Routes
   │
   ▼
Start Server
   │
   ▼
http://localhost:5000
```

---

## Useful Commands

### Initialize a Node.js project

```bash
npm init -y
```

### Install Express

```bash
npm install express
```

### Start the server

```bash
node server.js
```

### Start with npm script

```bash
npm start
```

### Start development server with Nodemon

```bash
npm run dev
```

---

## You're Ready!

Your basic **Node.js + Express.js server** is now set up.

From here, you can expand it by adding:

* API routes
* Controllers
* Middleware
* MongoDB/Mongoose
* Authentication
* Error handling
* File uploads
* REST APIs
* Environment variables
* CORS