const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cors());
require('dotenv').config();

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(200).send("Hey there");
});

app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});