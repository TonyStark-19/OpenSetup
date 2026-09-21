## Prerequisites

Before starting, make sure **Node.js** and **npm** are installed on your machine.

Run the following commands in your terminal:

```bash
node -v
npm -v
```

You should also have an **Express server** already created.

If you don't have one, create a new project:

```bash
mkdir my-server
cd my-server
npm init -y
```

Install Express:

```bash
npm install express
```

---

## Step 1: Install Mongoose

Mongoose is an ODM (Object Data Modeling) library that makes it easier to work with MongoDB from a Node.js application.

Install it using npm:

```bash
npm install mongoose
```

---

## Step 2: Create a MongoDB Database

You can use **MongoDB Atlas** for a cloud-hosted MongoDB database or run MongoDB locally.

For MongoDB Atlas, create a cluster and obtain your MongoDB connection string.

It will look similar to:

```text
mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>
```

Replace the placeholders with your MongoDB credentials and database name.

> Never expose your MongoDB connection string directly in your source code or commit it to GitHub.

---

## Step 3: Create an Environment File

Create a `.env` file in the root of your Express project:

```text
my-server/
├── src/
├── .env
├── .gitignore
├── package.json
└── server.js
```

Add your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase
```

Replace the values with your actual MongoDB credentials.

---

## Step 4: Add `.env` to `.gitignore`

Make sure your environment file isn't pushed to GitHub.

Open `.gitignore` and add:

```text
node_modules/
.env
```

This prevents your MongoDB credentials from being accidentally exposed.

---

## Step 5: Install dotenv

Install `dotenv` so your Express application can access variables from the `.env` file:

```bash
npm install dotenv
```

---

## Step 6: Create a Database Connection File

Create a `config` folder inside `src`:

```text
src/
├── config/
│   └── db.js
├── server.js
└── ...
```

Inside `db.js`, import Mongoose:

```js
import mongoose from "mongoose";
```

Create a function to connect to MongoDB:

```js
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
```

The function connects your Express application to MongoDB using the connection string stored in `MONGO_URI`.

---

## Step 7: Configure Environment Variables

If you're using ES Modules, make sure your `package.json` contains:

```json
{
  "type": "module"
}
```

Then load your environment variables in your server entry point.

For example, in `server.js`:

```js
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Step 8: Start the Express Server

Run:

```bash
node server.js
```

If everything is configured correctly, you should see:

```text
Server running on port 5000
MongoDB connected successfully
```

Your Express server is now connected to MongoDB through Mongoose.

---

## Step 9: Create a Mongoose Model

Once the database connection is working, you can create models to define the structure of your MongoDB documents.

Create a `models` folder:

```text
src/
├── config/
│   └── db.js
├── models/
│   └── User.js
└── server.js
```

Inside `User.js`:

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
```

The schema defines the structure and validation rules for your `User` documents.

---

## Step 10: Use the Model in an Express Route

You can now use the Mongoose model inside your Express routes.

For example:

```js
import express from "express";
import User from "./models/User.js";

const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
```

Then connect the route to your Express application.

---

## Final Project Structure

Your project can now look like:

```text
my-server/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

---

## Connection Flow

The overall architecture looks like this:

```text
Express Server
      │
      ▼
   Mongoose
      │
      ▼
 MongoDB
      │
      ▼
 Database
```

More specifically:

```text
.env
 │
 │ MONGO_URI
 ▼
server.js
 │
 │ connectDB()
 ▼
config/db.js
 │
 │ mongoose.connect()
 ▼
MongoDB
```

---

## Important Packages

| Package    | Purpose                                                           |
| ---------- | ----------------------------------------------------------------- |
| `express`  | Creates the backend server and API routes                         |
| `mongoose` | Connects Node.js/Express with MongoDB and provides schemas/models |
| `dotenv`   | Loads environment variables from `.env`                           |

Install them together with:

```bash
npm install express mongoose dotenv
```

---

## Common MongoDB Connection Errors

### Authentication Failed

Check your MongoDB username and password in the connection string.

If your password contains special characters such as `@`, `#`, or `%`, make sure they are properly URL-encoded.

### Network Access Error

If you're using MongoDB Atlas, check your cluster's network access settings and make sure your current IP address is allowed.

### Environment Variable is Undefined

Make sure:

1. `.env` is in the project root.
2. `dotenv.config()` runs before `connectDB()`.
3. The variable name matches exactly.

For example:

```env
MONGO_URI=your_connection_string
```

and:

```js
process.env.MONGO_URI
```

---

## You're Ready!

Your Express server is now connected to MongoDB using Mongoose.

The basic setup to remember is:

```text
Install Mongoose
      ↓
Create MongoDB database
      ↓
Store MONGO_URI in .env
      ↓
Create connectDB()
      ↓
mongoose.connect()
      ↓
Create Schemas & Models
      ↓
Use Models in Express Routes
```