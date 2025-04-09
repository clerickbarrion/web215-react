require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const PASSWORD = process.env.PASSWORD
app.use(cors());
app.use(express.json());
// Connect to MongoDB

mongoose.connect(`mongodb+srv://clerick:${PASSWORD}@cluster0.al3ccwe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware

const usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    picture: String,
    favorites: Array,
    reviews: Array,
  });

const Users = mongoose.model('Users', usersSchema);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/users', async (req, res) => {
    const users = await Users.find();
    res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = new Users(req.body);
  const users = await Users.find();
  if (users.some(user => user.username === newUser.username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  await newUser.save();
  res.json(newUser);
});

app.post('/login', async (req,res) => {
  const users = await Users.find();
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.json(user);
  } else {
    res.status(401).json({ message: 'Incorrect username/password' });
  }
})

app.get('/review/:movie_id', async (req, res) => {
  const { movie_id } = req.params;
  const users = await Users.find({ reviews: { $elemMatch: { movie: movie_id } } })
  if (users.length === 0) res.status(404).json({ message: 'No reviews found for this movie' });
  const reviews = users.map(user => user.reviews.filter(review => review.movie === movie_id).map(review => ({ ...review, username: user.username, picture: user.picture })));
  res.json(reviews.flat());
})

app.post('/review', async (req, res) => {
  const review = req.body;
  Users.findOneAndUpdate({ username: review.username }, { $push: { reviews: review } }, { new: true })
})
