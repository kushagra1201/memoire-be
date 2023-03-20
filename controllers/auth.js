const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const client = require('../configs/db');

// const temporaryData = [
//   {
//     name: "kushagra",
//     email: "kushagra@gmail.com",
//     password: "abcd"
//   },
//   {
//     name: "kunal",
//     email: "kunal@gmail.com",
//     password: "fgng"
//   },
//   {
//     name: "harsh",
//     email: "harsh@gmail.com",
//     password: "asew"
//   },
//   {
//     name: "anirudh",
//     email: "anirudh@gmail.com",
//     password: "adsfa"
//   },
// ]

exports.signUp = (req, res) => {
  const {name, email, password} = req.body;

  //check if user already exists
  // const isValid = temporaryData.findIndex((ele) => ele.email === email);
  
  client.query(`SELECT * FROM users where email = '${email}'`).then((data) => {
    const isValid = data.rows;

    if(isValid.length !== 0){
      res.status(400).json({
        error: "User already exists",
      });
    }else{
      
      // console.log(token);
      
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
        
        // temporaryData.push(user);
        client.query(`INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}')`).then((data) => {
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY,
          );
          res.status(200).json({
            message: "User added successfully to Database",
            token: token,
          });
          
        }).catch((err) => {
          res.status(500).json({
            error: "Database Error Occured",
          })
        });
        
      });
    }
  }).catch((err) => {
    res.status(500).json({
      error: "Database Error Occured",
    })
  });
};

exports.signIn = (req, res) => {
  const {email, password} = req.body;
  
  //check if user already exists
  // const isValid = temporaryData.findIndex((ele) => ele.email === email);
  
  client.query(`SELECT * FROM users where email = '${email}'`).then((data) => {
    userData = data.rows;

    if(userData.length === 0){
      res.status(400).json({
        error: "User does not exist, Please sign up",
      });
    }else{

        bcrypt.compare(password, userData[0].password, (err, result)=>{
          if(err){
            res.status(500).json({
              error: "Bad Request",
            })
          }else if(result === true){
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY,
            );
            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          }else{
            res.status(400).json({
              error: "Enter correct password",
            })
          }
        });
      }
  }).catch((err) => {
    res.status(500).json({
      error: "Database Error Occured",
    })
  });
};