const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const multer = require("multer"); // 🔥 ADDED

const app = express();

// 🔥 ENV MODE
const isProd = process.env.NODE_ENV === "production";
const secret = process.env.JWT_SECRET || "dhsgsghdshggd";

// ================= DB CONNECTION =================

const MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/bookapp";

mongoose.connect(MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// ================= MODELS =================
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const Book = require("./database/Book");

const User = mongoose.model("User", userSchema);

// ================= MIDDLEWARE =================
app.use(cors({
  origin: isProd 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// 🔥 MULTER SETUP (ADDED)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= ROUTES =================

// TEST
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).send("All fields required");
    }

    const existinguser = await User.findOne({ username });

    if (existinguser) {
      return res.status(400).send("user already exist");
    }

    const user = new User({ username, password, email });
    await user.save();

    const token = jwt.sign(
      { email: user.email, username: user.username },
      secret,
      { expiresIn: "1d" }
    );

    res.cookie("user", token, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd
    });

    res.send("signup success");

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).send("All fields required");
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send("user not found");
    }

    if (user.password !== password) {
      return res.status(400).send("wrong password");
    }

    const token = jwt.sign(
      { email: user.email, username: user.username },
      secret,
      { expiresIn: "1d" }
    );

    res.cookie("user", token, {
      httpOnly: true,
      sameSite: isProd ? "none" : "lax",
      secure: isProd
    });

    res.send("login success");

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= ADD BOOK =================
// 🔥 ONLY THIS ROUTE UPDATED
app.post("/addbook", upload.single("cover"), async (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const data = jwt.verify(token, secret);

    const { title, description, content ,category } = req.body;
    const cover = req.file;

    if (!title || !description || !content || !cover) {
      return res.status(400).send("All fields required");
    }

    const book = new Book({
      title,
      description,
      content,
      category,
      cover: cover.buffer.toString("base64"), // 🔥 store image
      username: data.username,
      email: data.email
    });

    await book.save();
    console.log(book);

    res.send("book added");

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= CHECK USER =================
app.get("/me", (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const data = jwt.verify(token, secret);

    res.json(data);
  } catch (err) {
    return res.status(401).send("invalid");
  }
});

// ================= GET BOOKS =================
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= LOGOUT =================
app.get("/logout", (req, res) => {
  res.clearCookie("user", {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: isProd
  });
  res.send("logged out");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});