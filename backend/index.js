const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();
const secret = "dhsgsghdshggd";

// ================= DB CONNECTION =================
mongoose.connect("mongodb://127.0.0.1:27017/bookapp")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// ================= MODELS =================
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});


const Book = require("./database/Book"); // 

const User = mongoose.model("User", userSchema);

// ================= MIDDLEWARE =================
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// ================= ROUTES =================

// TEST
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
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
      sameSite: "lax"
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
      sameSite: "lax"
    });

    res.send("login success");

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= ADD BOOK =================
app.post("/addbook", async (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const data = jwt.verify(token, secret);

    const { title, description, cover, content } = req.body;

    const book = new Book({
      title,
      description,
      cover,
      content,
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
// ================= Check user  =================
app.get("/me", (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const data = jwt.verify(token, secret);

    res.json(data); // user is valid
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
  res.clearCookie("user");
  res.send("logged out");
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});