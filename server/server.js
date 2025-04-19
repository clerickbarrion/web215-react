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

app.get('/users/:username', async (req, res) => {
  const { username } = req.params;
  const user = await Users.findOne({ username });
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.password = undefined;
  res.json(user);
})

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
    user.password = undefined;
    user.reviews = undefined;
    user.favorites = undefined;
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
  const user = await Users.findOneAndUpdate({ username: review.username }, { $push: { reviews: {movie: review.movie, comment: review.comment, title: review.title, poster_path: review.poster_path, date: review.date} } }, { new: true })
  await user.save()
  res.json({ message: 'Review added' });
})

app.put('/review', async (req, res) => {
  const { username, comment, date } = req.body;
  await Users.findOneAndUpdate({ username, 'reviews.date': date }, { $set: { 'reviews.$.comment': comment } }, { new: true });
  res.json({ message: 'Review updated' });
})

app.delete('/review', async (req, res) => {
  const { username, date } = req.body;
  await Users.findOneAndUpdate({ username, 'reviews.date': date }, { $pull: { reviews: { date } } }, { new: true });
  res.json({ message: 'Review deleted' });
})

app.post('/favorites', async (req, res) => {
  const { username, movie_id, title, poster_path } = req.body;
  const user = await Users.findOneAndUpdate({ username }, { $push: { favorites: {movie: movie_id, title, poster_path} } }, { new: true });
  await user.save();
  res.json({ message: 'Movie added to favorites' });
})

app.delete('/favorites', async (req, res) => {
  const { username, movie_id } = req.body;
  await Users.findOneAndUpdate({ username }, { $pull: { favorites: {movie: movie_id} } }, { new: true });
  res.json({ message: 'Movie removed from favorites' });
})