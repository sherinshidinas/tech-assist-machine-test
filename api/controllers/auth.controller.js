import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //check existing user
  const q = "SELECT * FROM profiles WHERE email = ? OR username = ?";
  db.query(q, [req.body.email, req.body.username], async (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists");

    //hash the password and create the user
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO profiles (`username`,`email`,`company`,`password`) VALUES (?)";
    const values = [req.body.username, req.body.email, req.body.company, hash];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.log("Error inserting user:", err);
        return res.json(err);
      }
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //check the user exist or not
  const q = "SELECT * FROM profiles WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong Username or Password!");

    const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
    const { password, ...others } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({message:"Login Successfull",others});
  });
};

export const getProfile = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, process.env.JWT_KEY, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");
    console.log("user info", userInfo);
    const q = "SELECT username, email, company FROM profiles WHERE id = ?";
    db.query(q, [userInfo.id], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data[0]);
    });
  });
};

export const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      samesite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out!");
};
