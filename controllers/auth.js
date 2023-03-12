const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const temporaryData = [
  {
    name: "kushagra",
    email: "kushagra@gmail.com",
    password: "abcd"
  },
  {
    name: "kunal",
    email: "kunal@gmail.com",
    password: "fgng"
  },
  {
    name: "harsh",
    email: "harsh@gmail.com",
    password: "asew"
  },
  {
    name: "anirudh",
    email: "anirudh@gmail.com",
    password: "adsfa"
  },
]


exports.signUp = (req, res) => {
  const {name, email, password} = req.body;

  //check if user already exists
  const isValid = temporaryData.findIndex((ele) => ele.email === email);

  if(isValid !== -1){
    res.status(400).json({
      error: "User already exists",
    });
  }

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.SECRET_KEY,
  );

  console.log(token);

  //hash password
  bcrypt.hash(password, 10, (err, hash) => {
    if(err){
      res.status(500).json({
        error: "Internal Server Error",
      });
    }

    const user = {
      name, 
      email, 
      password: hash,
    }

    temporaryData.push(user);

    res.status(200).json({
      message: "User added successfully to Database",
      token: token,
    });
  });

  //generate token


  
  //send response to user along with the token
};

exports.signIn = (req, res) => {

};