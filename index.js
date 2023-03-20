require("dotenv").config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const client = require('./configs/db');

const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

client.connect(() => {
  console.log('Connected to DB');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});