const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require("dotenv").config();

const multer = require("multer"); 

const app = express();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ,
  key_secret: process.env.RAZORPAY_KEY_SECRET 
});

const isProd = process.env.NODE_ENV === "production";
const secret = process.env.JWT_SECRET;



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
  origin:
  [ "https://bookwebsite-g8rv.vercel.app" ,
     "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= ROUTES =================

// TEST
app.get("/", (req, res) => {
  res.send("Backend Running ");
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
app.get("/me", async (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const data = jwt.verify(token, secret);

    const user = await User.findOne({ email: data.email });

    if (!user) {
      return res.status(404).send("user not found");
    }

    let savedBooks = [];

    if (user.savedBooks && user.savedBooks.length > 0) {
      savedBooks = await Book.find({
        _id: { $in: user.savedBooks }
      });
    }

    res.json({
      user: {
        username: user.username,
        email: user.email
      },
      saved: savedBooks
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= GET BOOKS =================
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();

    const token = req.cookies.user;
    let user = null;

    if (token) {
      try {
        const data = jwt.verify(token, secret);
        user = await User.findOne({ email: data.email });
      } catch {}
    }

    const modifiedBooks = books.map(book => {
      if (book.isPremium) {
        if (!user || !user.isPremium || user.premiumExpiry < new Date()) {
          return {
            ...book.toObject(),
            content: " Buy Premium to Read"
          };
        }
      }
      return book;
    });

    res.json(modifiedBooks);

  } catch (err) {
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

// ================= RATE BOOK =================
app.post("/rate", async (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const userData = jwt.verify(token, secret);
    const { bookId, value } = req.body;

    const book = await Book.findById(bookId);

    
    if (!book.ratings) book.ratings = [];

    let found = false;

    for (let i = 0; i < book.ratings.length; i++) {
      if (book.ratings[i].email === userData.email) {
        book.ratings[i].value = value;
        found = true;
        break;
      }
    }

    if (!found) {
      book.ratings.push({
        email: userData.email,
        value
      });
    }

   
    let total = 0;
    for (let i = 0; i < book.ratings.length; i++) {
      total += book.ratings[i].value;
    }

    const avg = total / book.ratings.length;

   
    book.average = avg;

    await book.save();

    res.json({ average: avg });

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= SAVE/UNSAVE BOOK =================
app.post("/save", async (req, res) => {
  try {
    const token = req.cookies.user;

    if (!token) {
      return res.status(401).send("not logged in");
    }

    const userData = jwt.verify(token, secret);
    console.log("JWT EMAIL:", userData.email);

    const user = await User.findOne({ email: userData.email });
    console.log("USER:", user);

    if (!user) {
      return res.status(404).send("user not found");
    }

    const { bookId } = req.body;

    if (!user.savedBooks) {
      user.savedBooks = [];
    }

    const id = String(bookId);

    const index = user.savedBooks.indexOf(id);

    if (index === -1) {
      user.savedBooks.push(id);
      await user.save();
      console.log("SAVED:", user.savedBooks);
      return res.send("saved");
    } else {
      user.savedBooks.splice(index, 1);
      await user.save();
      console.log("UNSAVED:", user.savedBooks);
      return res.send("unsaved");
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= update =================
app.post("/update-profile", async (req, res) => {
  try {
    const token = req.cookies.user;
    if (!token) return res.status(401).send("not logged in");

    const data = jwt.verify(token, secret);
    const { username, email } = req.body;

    const user = await User.findOne({ email: data.email });

    if (!user) return res.status(404).send("user not found");

    if (username) user.username = username;
    if (email) user.email = email;

    await user.save();

    res.send("updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

// ================= change passs =================
app.post("/change-password", async (req, res) => {
  try {
    const token = req.cookies.user;
    if (!token) return res.status(401).send("not logged in");

    const data = jwt.verify(token, secret);
    const { oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email: data.email });

    if (user.password !== oldPassword) {
      return res.status(400).send("wrong password");
    }

    user.password = newPassword;
    await user.save();

    res.send("password updated");
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});
// ================= create order =================
app.post("/create-order", async (req, res) => {
  try {
    const amount = 9900; // ₹99 (in paise)

    const options = {
      amount,
      currency: "INR",
      receipt: "order_" + Date.now()
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.log(err);
    res.status(500).send("error creating order");
  }
});

// ================= verify payment =================
app.post("/verify-payment", async (req, res) => {
  try {
    const token = req.cookies.user;
    if (!token) return res.status(401).send("not logged in");

    const userData = jwt.verify(token, secret);

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET  )
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).send("invalid signature");
    }

   console.log("EXPECTED:", expectedSignature);
   console.log("RECEIVED:", razorpay_signature);
    const user = await User.findOne({ email: userData.email });

    user.isPremium = true;
    user.premiumExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await user.save();

    res.send("payment success");

  } catch (err) {
    console.log(err);
    res.status(500).send("verification failed");
  }
});

// ================= is premium =================

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});